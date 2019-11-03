/**
 *  @file       OSCActionListener.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/
import osc from "osc";

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
class OSCActionListener {
  constructor(params) {
    this.params = params;
    this.store = params.store;
    this.clientId = params.clientId || null;
    this.init();
  }
  init() {
    //console.log(`binding to 0.0.0.0:${this.params.localPort}`);
    this.oscPort = new osc.UDPPort({
      localAddress: "0.0.0.0",
      localPort: this.params.localPort
    });
    this.oscPort.on("message", msg => {
      //console.log("msg");
      //console.log(msg);

      // expecting actions to have a `type` and an optional `payload`, key
      // value pairs sent in as a single OSC array.  If the keyword `payload`
      // appears, it implies we start filling the payload with subsequent
      // key value pairs

      let actionPairs = msg.args;
      let i;
      let action = {};
      if (this.clientId) {
        action.clientId = this.clientId;
      }
      for (i = 0; i < actionPairs.length - 1; i += 2) {
        if (actionPairs[i] == "payloadString") {
          action.payload = JSON.parse(actionPairs[i + 1]);
          break;
        } else if (actionPairs[i] === "type") {
          action.type = actionPairs[i + 1];
        } else if (actionPairs[i] === "payloadPairs") {
          action.payload = parse_payload_pairs(actionPairs.slice(i + 1));
          break;
        } else {
          throw new Error(
            `Don't know how to parse action: ${JSON.stringify(msg)}`
          );
        }
      }

      this.store.dispatch(action);
    });
    this.oscPort.open();
  }
  quit() {
    this.oscPort.close();
  }
}

export default OSCActionListener;
