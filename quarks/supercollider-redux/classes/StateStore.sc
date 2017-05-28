/**
 *  @file       StateStore.sc
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

/**
 *  @class        StateStore
 *
 *  @classdesc    Provides a singleton state store which expects to receive
 *  state from OSC messages sent over the StateStore API (see apis/).  Also
 *  dispatches actions back up to the primary state store and publishes
 *  state updates to all local subscriber functions.
 **/
StateStore {
  classvar <>instance;
  var state,
    subscribers,
    dispatchSockets;

  *new {
    arg initialState;
    ^super.new.init(initialState);
  }
  *getInstance {
    if (this.instance == nil, {
      this.instance = StateStore.new(());
    });

    ^this.instance;
  }
  init {
    arg initialState;

    dispatchSockets = [
      Server.new(\primaryStore, NetAddr.new("127.0.0.1", 3334))
    ];

    state = initialState;

    subscribers = List.new();

    ^this;
  }
  /**
   *  Supporting multiple dispatch locations.  To set, pass a dict with 
   *  each item including `addr` and `port`:
   *  
   *    var store = StateStore.getInstance();
   *
   *    store.setDispatchLocations((
   *      \one: (
   *        addr: "127.0.0.1",
   *        port: 3334
   *
   *      ),
   *      \two: (
   *        addr: "127.0.0.1",
   *        port: 3335
   *      )
   *    ));
   **/
  setDispatchLocations {
    arg locationsDict;
    
    dispatchSockets = [];

    locationsDict.keysValuesDo({
      arg name, location;
      dispatchSockets.add(Server.new(name, NetAddr.new(location.addr, location.port)));
    });
  }

  dispatch {
    arg action;
    var actionPairs = action.getPairs(),
      payloadPairs = [];
    if (action.payload != nil, {
      payloadPairs = action.payload.getPairs();
    });
    dispatchSockets.do({
      arg dispatchSocket;

      dispatchSocket.listSendMsg(["/dispatch"] ++ actionPairs ++ payloadPairs);
    });
  }

  subscribe {
    arg func;
    subscribers.add(func);
  }

  getState {
    ^state;
  }

  setState {
    arg newState;

    state = newState;

    subscribers.do({
      arg subscriber;

      subscriber.value();
    });
  }
}
