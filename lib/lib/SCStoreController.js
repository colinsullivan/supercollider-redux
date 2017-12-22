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

var _nodeOsc = require("node-osc");

var _nodeOsc2 = _interopRequireDefault(_nodeOsc);

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

    this.actionListenerSocket = new _nodeOsc2.default.Server(3334, "127.0.0.1");
    this.actionListenerSocket.on("message", function (msg, rinfo) {
      //console.log("msg");
      //console.log(msg);
      //console.log("rinfo");
      //console.log(rinfo);

      var command = msg[0];
      switch (command) {
        case '/dispatch':
          var actionPairs = msg.slice(1);
          var i = 0;
          var action = {};
          var parsingPayload = false;
          while (i < actionPairs.length - 1) {
            // if 'payload' is sent, we'll take all the following pairs
            // as key / values of the payload
            if (actionPairs[i] == 'payload') {
              parsingPayload = true;
              action.payload = {};
              i += 1;
            } else {
              if (parsingPayload == false) {
                // by default, forward all pairs as key / value
                action[actionPairs[i]] = actionPairs[i + 1];
              } else {
                // unless we're parsing the payload
                action.payload[actionPairs[i]] = actionPairs[i + 1];
              }
              i += 2;
            }
          }
          _this.store.dispatch(action);
          break;

        default:
          break;
      }
    });

    // we're starting our journey!
    this.store.dispatch(_2.default.actions.supercolliderInitStarted());

    // reads config file located at: ./.supercollider.yaml
    var api = new _supercolliderjs2.default.scapi();

    this.scapi = api;
    api.log.echo = true;

    api.on("error", function (err) {
      console.log("API ERROR: ");
      console.log(err);
    });

    //console.log("sc api connecting...");
    api.connect();
    //console.log("connect.");

    // send init message to the sc process
    this.call("StateStore.init", [this.store.getState()]);

    //.then((resp) => {
    //if (resp.result.status === "ok") {
    ////console.log("sc api connected.");
    //this.store.dispatch(actions.supercolliderReady());
    //} else {
    //console.error("ERROR: [SCController] Unable to connect to SuperCollider process.");
    //}
    //});
    this.store.subscribe(function () {
      _this.handleStoreChanged();
    });
  }

  _createClass(SCStoreController, [{
    key: "handleStoreChanged",
    value: function handleStoreChanged() {
      var state = this.store.getState();
      //console.log("handleStoreChanged");
      // send all state changes to sclang process
      //if (state.scStateStoreReadyState == "READY") {
      //console.log("calling StateStore.setState with");
      //console.log("state");
      //console.log(JSON.stringify(state, " ", 4));
      this.call("StateStore.setState", [state]);
      //}
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