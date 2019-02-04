"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  @file       SCStoreController.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  @copyright  2017 Colin Sullivan
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  @license    Licensed under the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      **/

var _supercolliderjs = require("supercolliderjs");

var _supercolliderjs2 = _interopRequireDefault(_supercolliderjs);

var _ = require("../");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  @class        SCStoreController
 *
 *  @classdesc    Forward state to replica store in SuperCollider.  Also 
 *  forward actions incoming from SuperCollider to the Redux store.
 **/
var SCStoreController = function () {
  function SCStoreController(store) {
    var _this = this;

    _classCallCheck(this, SCStoreController);

    this.store = store;
    this._apiCallIndex = 0;

    this.actionListener = new _2.default.OSCActionListener({
      localPort: 3335,
      store: store,
      clientId: 'supercollider'
    });

    // we're starting our journey!
    this.store.dispatch(_2.default.actions.supercolliderInitStarted());

    // reads config file located at: ./.supercollider.yaml
    var api = new _supercolliderjs2.default.scapi();

    this.scapi = api;
    api.log.debug = true;
    api.log.echo = true;

    api.on("error", function (err) {
      console.log("API ERROR: ");
      console.log(err);
    });

    api.connect();

    // send init message to the sc process
    this.call("StateStore.init", [this.store.getState()]);
    this.store.subscribe(function () {
      _this.handleStoreChanged();
    });
  }

  _createClass(SCStoreController, [{
    key: "handleStoreChanged",
    value: function handleStoreChanged() {
      this.call("StateStore.setState", [this.store.getState()]);
    }
  }, {
    key: "getAPICallIndex",
    value: function getAPICallIndex() {
      if (this._apiCallIndex < Number.MAX_SAFE_INTEGER - 1) {
        this._apiCallIndex++;
      } else {
        this._apiCallIndex = 0;
      }
      return this._apiCallIndex;
    }
  }, {
    key: "call",
    value: function call(apiMethodName, args) {
      return this.scapi.call(this.getAPICallIndex(), apiMethodName, args);
    }
  }]);

  return SCStoreController;
}();

exports.default = SCStoreController;