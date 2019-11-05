"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _scapi = _interopRequireDefault(require("@supercollider/scapi"));

var _ = _interopRequireDefault(require("../"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  @file       SCStoreController.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

/**
 *  @class        SCStoreController
 *
 *  @classdesc    Forward state to replica store in SuperCollider.  Also
 *  forward actions incoming from SuperCollider to the Redux store.
 **/
class SCStoreController {
  /**
   *  Creates an SCStoreController and sends `init` to SC.
   *
   *  @param  {redux.Store}  store - The state store.
   **/
  constructor(store) {
    this.store = store;
    this._apiCallIndex = 0;
    this.actionListener = new _.default.OSCActionListener({
      localPort: 3335,
      store,
      clientId: "supercollider"
    }); // Sets the SC store ready state

    this.store.dispatch(_.default.actions.scStoreInit()); // reads config file located at: ./.supercollider.yaml

    var api = new _scapi.default();
    this.scapi = api;
    api.on("error", err => this.handle_api_error(err));
    api.connect(); // send init message to the SC store once

    this.call("SCReduxStore.init", [this.store.getState()]); // send `setState` message to the SC store whenever state changes

    this.store.subscribe(() => {
      this.call("SCReduxStore.setState", [this.store.getState()]);
    });
  }

  handle_api_error(err) {
    console.log("SCStoreController api ERROR!");
    console.log("err");
    console.log(err);
  }

  call(apiMethodName, args) {
    return this.scapi.call(undefined, apiMethodName, args).catch(err => this.handle_api_error(err));
  }

  quit() {
    this.scapi.quit();
    this.actionListener.quit();
  }

}

var _default = SCStoreController;
exports.default = _default;