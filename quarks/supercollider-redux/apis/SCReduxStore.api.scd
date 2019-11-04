/**
 *  @file       SCReduxStore.api.scd
 *
 *	@desc       API for SCReduxStore singleton.  Uses the SuperCollider API
 *              quark.
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

(
  init: {
    arg reply, initialState;
    var store = SCReduxStore.getInstance();
    //"SCReduxStore.api.init".postln();
    store.setState(initialState);
    store.dispatch((
      type: SCRedux.actionTypes['SC_STORE_READY']
    ));
  },
  setState: {
    arg reply, state;
    var store = SCReduxStore.getInstance();
    //"SCReduxStore.api.setState".postln;
    store.setState(state);
  }
);
