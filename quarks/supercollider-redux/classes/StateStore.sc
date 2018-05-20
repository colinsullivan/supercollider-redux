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
    dispatchSocketsDict;

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

    dispatchSocketsDict = (
      \primary: NetAddr.new("127.0.0.1", 3334)
    );

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

    // disconnect all sockets
    dispatchSocketsDict.keysValuesDo({
      arg socketName, socket;
      socket.disconnect();
    });
    
    dispatchSocketsDict = ();

    // create new sockets
    locationsDict.keysValuesDo({
      arg name, location;
      dispatchSocketsDict[name] = NetAddr.new(location.addr, location.port);
    });
  }

  dispatch {
    arg action;
    var actionPairs = action.getPairs(),
      payloadPairs = [],
      msg;

    if (action.payload != nil, {
      //"[supercollider-redux]: Preparing payload...".postln();
      payloadPairs = action.payload.getPairs();
      actionPairs = ['type', action.type];
      msg = (["/dispatch"] ++ actionPairs ++ ['payload'] ++ payloadPairs);
    }, {
      msg = (["/dispatch"] ++ actionPairs);
    });
    dispatchSocketsDict.keysValuesDo({
      arg socketName, socket;
      //"[supercollider-redux]: Dispatching message: ".postln();
      //("[supercollider-redux]: " ++ msg).postln();
      socket.sendRaw(msg.asRawOSC());
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
