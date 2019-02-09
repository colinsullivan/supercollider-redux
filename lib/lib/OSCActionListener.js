"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _osc = _interopRequireDefault(require("osc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function parse_payload_pairs(payloadPairs) {
  var i,
      payload = {};

  for (i = 0; i < payloadPairs.length; i += 2) {
    payload[payloadPairs[i]] = payloadPairs[i + 1];
  }

  return payload;
}
/**
 *  @class        OSCActionListener
 *
 *  @classdesc    Listen for actions on an incoming OSC port and forward
 *  to the state store.
 **/


var OSCActionListener =
/*#__PURE__*/
function () {
  function OSCActionListener(params) {
    _classCallCheck(this, OSCActionListener);

    this.params = params;
    this.store = params.store;
    this.clientId = params.clientId || null;
    this.init();
  }

  _createClass(OSCActionListener, [{
    key: "init",
    value: function init() {
      var _this = this;

      //console.log(`binding to 0.0.0.0:${this.params.localPort}`);
      this.oscPort = new _osc.default.UDPPort({
        localAddress: '0.0.0.0',
        localPort: this.params.localPort
      });
      this.oscPort.on("message", function (msg) {
        //console.log("msg");
        //console.log(msg);
        // expecting actions to have a `type` and an optional `payload`, key
        // value pairs sent in as a single OSC array.  If the keyword `payload`
        // appears, it implies we start filling the payload with subsequent
        // key value pairs
        var actionPairs = msg.args;
        var i;
        var action = {};

        if (_this.clientId) {
          action.clientId = _this.clientId;
        }

        for (i = 0; i < actionPairs.length - 1; i += 2) {
          if (actionPairs[i] == 'payloadString') {
            action.payload = JSON.parse(actionPairs[i + 1]);
            break;
          } else if (actionPairs[i] === 'type') {
            action.type = actionPairs[i + 1];
          } else if (actionPairs[i] === 'payloadPairs') {
            action.payload = parse_payload_pairs(actionPairs.slice(i + 1));
            break;
          } else {
            throw new Error("Don't know how to parse action: ".concat(JSON.stringify(msg)));
          }
        }

        _this.store.dispatch(action);
      });
      this.oscPort.open();
    }
  }, {
    key: "quit",
    value: function quit() {
      this.oscPort.close();
    }
  }]);

  return OSCActionListener;
}();

var _default = OSCActionListener;
exports.default = _default;