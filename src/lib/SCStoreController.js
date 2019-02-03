/**
 *  @file       SCStoreController.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import sc from "supercolliderjs"
import supercolliderRedux from "../"

/**
 *  @class        SCStoreController
 *
 *  @classdesc    Forward state to replica store in SuperCollider.  Also 
 *  forward actions incoming from SuperCollider to the Redux store.
 **/
class SCStoreController {
  constructor(store) {
    this.store = store;
    this._apiCallIndex = 0;

    this.actionListener = new supercolliderRedux.OSCActionListener({
      localPort: 3335,
      store,
      clientId: 'supercollider'
    });

    // we're starting our journey!
    this.store.dispatch(supercolliderRedux.actions.supercolliderInitStarted());
    
    // reads config file located at: ./.supercollider.yaml
    var api = new sc.scapi();

    this.scapi = api;
    api.log.debug = true;
    api.log.echo = true;

    api.on("error", function (err) {
      console.log("API ERROR: ");
      console.log(err);
    });

    api.connect();

    // send init message to the sc process
    this.call("StateStore.init", [this.store.getState()]);
    this.store.subscribe(() => { this.handleStoreChanged(); });
    
  }
  handleStoreChanged() {
    this.call("StateStore.setState", [this.store.getState()]);
  }
  getAPICallIndex () {
    if (this._apiCallIndex < Number.MAX_SAFE_INTEGER - 1) {
      this._apiCallIndex++;
    } else {
      this._apiCallIndex = 0;
    }
    return this._apiCallIndex;
  }
  call (apiMethodName, args) {
    return this.scapi.call(this.getAPICallIndex(), apiMethodName, args);
  }
}

export default SCStoreController;
