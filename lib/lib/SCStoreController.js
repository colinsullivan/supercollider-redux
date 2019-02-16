"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _supercolliderjs = _interopRequireDefault(require("supercolliderjs"));

var _ = _interopRequireDefault(require("../"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  function SCStoreController(store) {
    var _this = this;

    _classCallCheck(this, SCStoreController);

    this.store = store;
    this._apiCallIndex = 0;
    this.actionListener = new _.default.OSCActionListener({
      localPort: 3335,
      store: store,
      clientId: 'supercollider'
    }); // we're starting our journey!

    this.store.dispatch(_.default.actions.supercolliderInitStarted()); // reads config file located at: ./.supercollider.yaml

    var api = new _supercolliderjs.default.scapi();
    this.scapi = api;
    api.log.debug = true;
    api.log.echo = true;
    api.on("error", function (err) {
      console.log("API ERROR: ");
      console.log(err);
    });
    api.connect(); // send init message to the sc process

    this.store.subscribe(function () {
      _this.handleStoreChanged();
    });
    this.call("StateStore.init", [this.store.getState()]);
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
exports.default = _default;