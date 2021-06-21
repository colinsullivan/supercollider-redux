"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var SCStoreController_1 = __importDefault(require("./SCStoreController"));
var SCLangController_1 = __importDefault(require("./SCLangController"));
/**
 *  @class        SCReduxController
 *
 *  @classdesc    A top-level interface for launching SuperCollider and setting
 *  up the SCReduxStore.
 *
 *  @param  {Object}  props - See SCLangController and SCStoreController for
 *  the possible options.
 **/
var SCReduxController = /** @class */ (function () {
    function SCReduxController(store, props) {
        this.sclangController = new SCLangController_1["default"](store, props);
        this.scStoreController = new SCStoreController_1["default"](store, props);
    }
    /**
     *  Start SuperCollider, initialize the replica state store, and set up a
     *  channels for sending state and receiving actions.
     *
     *  @return {Promise} - Resolves when sclang has booted and store is ready.
     **/
    SCReduxController.prototype.boot = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.sclangController.boot().then(function () {
                _this.scStoreController.init().then(res)["catch"](rej);
            })["catch"](rej);
        });
    };
    /**
     *  A helper method to get the `@supercolliderjs/lang` `SCLang` instance.
     **/
    SCReduxController.prototype.getSCLang = function () {
        return this.sclangController.getSCLang();
    };
    /**
     *  Stop all interfaces and shutdown SuperCollider.
     *
     *  @return {Promise} - Resolves when everything has shutdown.
     **/
    SCReduxController.prototype.quit = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.scStoreController.quit();
            _this.sclangController.quit().then(res)["catch"](rej);
        });
    };
    return SCReduxController;
}());
exports["default"] = SCReduxController;
