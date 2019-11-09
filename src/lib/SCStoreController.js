/**
 *  @file       SCStoreController.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import SCAPI from "@supercollider/scapi";
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
      // TODO :configurable port
      localPort: 3335,
      store,
      clientId: "supercollider"
    });

    // Sets the SC store ready state
    this.store.dispatch(SCRedux.actions.scStoreInit());

    // reads config file located at: ./.supercollider.yaml
    var api = new SCAPI();

    this.scapi = api;

    api.on("error", err => this.handle_api_error(err));

    api.connect();

    // send init message to the SC store once
    this.call("SCReduxStore.init", [this.store.getState()]);

    // send `setState` message to the SC store whenever state changes
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
    return this.scapi
      .call(undefined, apiMethodName, args)
      .catch(err => this.handle_api_error(err));
  }
  quit() {
    this.scapi.disconnect();
    this.actionListener.quit();
  }
}

export default SCStoreController;
