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
   *  @param  {Function}  props.scStateSelector - A function which receives
   *  state and outputs the portion of state to be forwarded to SuperCollider
   *  on `setState`.  Written `scStateSelector` to suggest it is implemented
   *  as a `reselect` selector.
   **/
  constructor(store, props = {}) {
    this.store = store;
    this._apiCallIndex = 0;

    const {
      actionListenerPort=DEFAULT_ACTION_LISTENER_PORT,
      scStateSelector = state => state
    } = props;

    this.actionListener = new SCRedux.OSCActionListener({
      localPort: actionListenerPort,
      store,
      clientId: "supercollider"
    });
    this.scStateSelector = scStateSelector;

    const api = new SCAPI();

    this.scapi = api;

    api.on("error", err => {
      this.handle_api_error(err);
    });
  }
  init () {
    return new Promise((res, rej) => {
      // Sets the SC store ready state
      this.store.dispatch(SCRedux.actions.scStoreInit());

      this.scapi.connect();

      // send init message to the SC store once
      this.call("SCReduxStore.init", [this.store.getState()]).then(() => {
        // send `setState` message to the SC store whenever state changes
        this.prevState = null;
        let state;
        this.unsubscribe = this.store.subscribe(() => {
          state = this.scStateSelector(this.store.getState());
          if (this.prevState !== state) {
            this.prevState = state;
            this.call("SCReduxStore.setState", [state]);
          }
        });

        res();
      }).catch(rej);
    });
  }
  handle_api_error(err) {
    console.log("SCStoreController api ERROR!");
    console.log("err");
    console.log(err);
  }
  call(apiMethodName, args) {
    return this.scapi
      .call(undefined, apiMethodName, args);
  }
  quit() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    if (this.scapi) {
      this.scapi.disconnect();
    }
    if (this.actionListener) {
      this.actionListener.quit();
    }
  }
}

export default SCStoreController;
