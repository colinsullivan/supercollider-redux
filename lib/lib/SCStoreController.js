"use strict";
/**
 *  @file       SCStoreController.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var scapi_1 = __importDefault(require("@supercollider/scapi"));
var __1 = __importDefault(require("../"));
var constants_1 = require("./constants");
/**
 *  @class        SCStoreController
 *
 *  @classdesc    Forward state to replica store in SuperCollider.  Also
 *  forward actions incoming from SuperCollider to the Redux store.
 **/
var SCStoreController = /** @class */ (function () {
    /**
     *  Creates an SCStoreController and sends `init` to SC, creating an
     *  OSCActionListener to receive actions dispatched from the SCReduxStore
     *  in SuperCollider and dispatch them to the store.
     *
     *  @param  {redux.Store}  store - The state store.
     *  @param  {Number}  props.actionListenerPort - The UDP port to listen for
     *  incoming actions from the SCReduxStore in SuperCollider.
     *  @param  {Function}  props.scStateSelector - A function which receives
     *  state and outputs the portion of state to be forwarded to SuperCollider
     *  on `setState`.  Written `scStateSelector` to suggest it is implemented
     *  as a `reselect` selector.
     **/
    function SCStoreController(store, props) {
        var _this = this;
        if (props === void 0) { props = {}; }
        this.store = store;
        this._apiCallIndex = 0;
        var _a = props.actionListenerPort, actionListenerPort = _a === void 0 ? constants_1.DEFAULT_ACTION_LISTENER_PORT : _a, _b = props.scStateSelector, scStateSelector = _b === void 0 ? function (state) { return state; } : _b;
        this.actionListener = new __1["default"].OSCActionListener({
            localPort: actionListenerPort,
            store: store,
            clientId: "supercollider"
        });
        this.scStateSelector = scStateSelector;
        var api = new scapi_1["default"]();
        this.scapi = api;
        api.on("error", function (err) {
            _this.handle_api_error(err);
        });
    }
    SCStoreController.prototype.init = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            // Sets the SC store ready state
            _this.store.dispatch(__1["default"].actions.scStoreInit());
            // Connects the API to the API Quark (assumes sclang is running and ready)
            _this.scapi.connect();
            // sends init message to the SC store once
            _this.call("SCReduxStore.init", [_this.store.getState()]).then(function () {
                // sends `setState` message to the SC store whenever state changes
                _this.prevState = null;
                var state;
                _this.unsubscribe = _this.store.subscribe(function () {
                    state = _this.scStateSelector(_this.store.getState());
                    if (_this.prevState !== state) {
                        _this.prevState = state;
                        _this.call("SCReduxStore.setState", [state]);
                    }
                });
                res();
            })["catch"](rej);
        });
    };
    SCStoreController.prototype.handle_api_error = function (err) {
        console.log("SCStoreController api ERROR!");
        console.log("err");
        console.log(err);
    };
    SCStoreController.prototype.call = function (apiMethodName, args) {
        return this.scapi
            .call(undefined, apiMethodName, args);
    };
    SCStoreController.prototype.quit = function () {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        if (this.scapi) {
            this.scapi.disconnect();
        }
        if (this.actionListener) {
            this.actionListener.quit();
        }
    };
    return SCStoreController;
}());
exports["default"] = SCStoreController;
