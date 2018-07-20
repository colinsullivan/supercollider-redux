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
      store
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
    this.store.subscribe(() => { this.handleStoreChanged(); });
    
  }
  handleStoreChanged() {
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
