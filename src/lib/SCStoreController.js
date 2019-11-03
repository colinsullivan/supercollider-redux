/**
 *  @file       SCStoreController.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import sc from "supercolliderjs";
import SCRedux from "../";

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

    this.actionListener = new SCRedux.OSCActionListener({
      localPort: 3335,
      store,
      clientId: "supercollider"
    });

    // Sets the SC store ready state
    this.store.dispatch(SCRedux.actions.supercolliderInitStarted());

    // reads config file located at: ./.supercollider.yaml
    var api = new sc.scapi();

    this.scapi = api;
    api.log.debug = true;
    api.log.echo = true;

    api.on("error", err => this.handle_api_error(err));

    api.connect();

    // send init message to the SC store once
    this.call("StateStore.init", [this.store.getState()]);

    // send `setState` message to the SC store whenever state changes
    this.store.subscribe(() => {
      this.call("StateStore.setState", [this.store.getState()]);
    });
  }
  handle_api_error(err) {
    console.log("API ERROR!");
    console.log("err");
    console.log(err);
  }
  getAPICallIndex() {
    if (this._apiCallIndex < Number.MAX_SAFE_INTEGER - 1) {
      this._apiCallIndex++;
    } else {
      this._apiCallIndex = 0;
    }
    return this._apiCallIndex;
  }
  call(apiMethodName, args) {
    return this.scapi
      .call(this.getAPICallIndex(), apiMethodName, args)
      .catch(err => this.handle_api_error(err));
  }
  disconnect() {
    this.scapi.disconnect();
    this.actionListener.quit();
  }
}

export default SCStoreController;
