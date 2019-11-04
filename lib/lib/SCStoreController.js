"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _scapi = _interopRequireDefault(require("@supercollider/scapi"));

var _ = _interopRequireDefault(require("../"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *  @class        SCStoreController
 *
 *  @classdesc    Forward state to replica store in SuperCollider.  Also
 *  forward actions incoming from SuperCollider to the Redux store.
 **/
var SCStoreController =
/*#__PURE__*/
function () {
  /**
   *  Creates an SCStoreController and sends `init` to SC.
   *
   *  @param  {redux.Store}  store - The state store.
   **/
  function SCStoreController(store) {
    var _this = this;

    _classCallCheck(this, SCStoreController);

    this.store = store;
    this._apiCallIndex = 0;
    this.actionListener = new _["default"].OSCActionListener({
      localPort: 3335,
      store: store,
      clientId: "supercollider"
    }); // Sets the SC store ready state

    this.store.dispatch(_["default"].actions.supercolliderInitStarted()); // reads config file located at: ./.supercollider.yaml

    var api = new _scapi["default"]();
    this.scapi = api;
    api.log.debug = true;
    api.log.echo = true;
    api.on("error", function (err) {
      return _this.handle_api_error(err);
    });
    api.connect(); // send init message to the SC store once

    this.call("StateStore.init", [this.store.getState()]); // send `setState` message to the SC store whenever state changes

    this.store.subscribe(function () {
      _this.call("StateStore.setState", [_this.store.getState()]);
    });
  }

  _createClass(SCStoreController, [{
    key: "handle_api_error",
    value: function handle_api_error(err) {
      console.log("SCStoreController api ERROR!");
      console.log("err");
      console.log(err);
    }
  }, {
    key: "call",
    value: function call(apiMethodName, args) {
      var _this2 = this;

      return this.scapi.call(undefined, apiMethodName, args)["catch"](function (err) {
        return _this2.handle_api_error(err);
      });
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      this.scapi.disconnect();
      this.actionListener.quit();
    }
  }]);

  return SCStoreController;
}();

var _default = SCStoreController;
exports["default"] = _default;