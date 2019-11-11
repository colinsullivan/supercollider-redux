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
import { DEFAULT_ACTION_LISTENER_PORT } from "./constants";

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
   *  @param  {Number}  props.actionListenerPort - The UDP port to listen for 
   *  incoming actions from the SCReduxStore in SuperCollider.
   **/
  constructor(store, props = {}) {
    this.store = store;
    this._apiCallIndex = 0;

    const {
      actionListenerPort=DEFAULT_ACTION_LISTENER_PORT
    } = props;

    this.actionListener = new SCRedux.OSCActionListener({
      localPort: actionListenerPort,
      store,
      clientId: "supercollider"
    });
  }
  init () {
    // Sets the SC store ready state
    this.store.dispatch(SCRedux.actions.scStoreInit());

    // reads config file located at: ./.supercollider.yaml
    const api = new SCAPI();

    this.scapi = api;

    api.on("error", err => this.handle_api_error(err));

    api.connect();

    // TODO: customize sent state with selector

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
