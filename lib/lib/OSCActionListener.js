"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/**
 *  @file       OSCActionListener.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/
var osc_1 = __importDefault(require("osc"));
function parse_payload_pairs(payloadPairs) {
    var i, payload = {};
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
var OSCActionListener = /** @class */ (function () {
    /**
     *  @param  {Store}  params.store - The state store
     *  @param  {String}  params.clientId - A unique string to indicate the dispatch
     *  origin.
     *  @param  {Number}  params.localPort - A number of which port to listen on
     *  for incoming actions.
     **/
    function OSCActionListener(params) {
        var _this = this;
        this.params = params;
        this.store = params.store;
        this.clientId = params.clientId || null;
        //console.log(`binding to 0.0.0.0:${this.params.localPort}`);
        this.oscPort = new osc_1["default"].UDPPort({
            localAddress: "127.0.0.1",
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
                if (actionPairs[i] == "payloadString") {
                    action.payload = JSON.parse(actionPairs[i + 1]);
                    break;
                }
                else if (actionPairs[i] === "type") {
                    action.type = actionPairs[i + 1];
                }
                else if (actionPairs[i] === "payloadPairs") {
                    action.payload = parse_payload_pairs(actionPairs.slice(i + 1));
                    break;
                }
                else {
                    throw new Error("Don't know how to parse action: " + JSON.stringify(msg));
                }
            }
            _this.store.dispatch(action);
        });
        this.oscPort.on("error", function (err) {
            console.error("OSCActionListener: OSC Port error:  " + err);
        });
        this.oscPort.open();
    }
    OSCActionListener.prototype.quit = function () {
        this.oscPort.close();
    };
    return OSCActionListener;
}());
exports["default"] = OSCActionListener;
