/**
 *  @file       StateStore.api.scd
 *
 *	@desc       API for StateStore singleton.  Uses the SuperCollider API
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
    var store = StateStore.getInstance();
    "StateStore.api.init".postln();
    store.setState(initialState);
    store.dispatch((
      type: "SUPERCOLLIDER-REDUX_SUPERCOLLIDER_READY"
    ));
    reply.value();
  },
  setState: {
    arg reply, state;
    var store = StateStore.getInstance();
    "StateStore.api.setState".postln;
    store.setState(state);
    reply.value();
  }
);
