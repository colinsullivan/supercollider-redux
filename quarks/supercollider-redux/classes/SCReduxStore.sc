/**
 *  @file       SCReduxStore.sc
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

/**
 *  @class        SCReduxStore
 *
 *  @classdesc    Provides a singleton state store which expects to receive
 *  state from OSC messages sent over the SCReduxStore API (see apis/).  Also
 *  dispatches actions back up to the primary state store and publishes
 *  state updates to all local subscriber functions.
 **/

SCReduxStore {
  classvar <>instance;
  var state,
    subscribers,
    dispatchSocketsDict;

  *new {
    arg props;
    ^super.new.init(props);
  }
  *getInstance {
    if (this.instance == nil, {
      this.instance = SCReduxStore.new();
    });

    ^this.instance;
  }
  init {
    arg props;
    var actionListenerPort;
    if (props.isNil(), {
      props = Dictionary.new();
    });
    if (props.at('actionListenerPort').isNil(), {
      actionListenerPort = SCRedux.defaultActionListenerPort();
    }, {
      actionListenerPort = props['actionListenerPort'];
    });
    dispatchSocketsDict = (
      \primary: NetAddr.new("127.0.0.1", actionListenerPort)
    );

    state = nil;

    subscribers = List.new();

    ^this;
  }
  /**
   *  Supporting multiple dispatch locations.  To set, pass a dict with 
   *  each item including `addr` and `port`:
   *  
   *    var store = SCReduxStore.getInstance();
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
    var msg,
      payloadString;

    if (action.payload != nil, {
      //"[supercollider-redux]: Preparing payload...".postln();
      payloadString = SuperColliderJS.stringify(action.payload);
      //"payloadString:".postln;
      //payloadString.postln;
      msg = ([
        "/dispatch",
        'type', action.type,
        'payloadString', payloadString
      ]);
    }, {
      msg = (["/dispatch", 'type', action.type]);
    });
    dispatchSocketsDict.keysValuesDo({
      arg socketName, socket;
      //"[supercollider-redux]: Dispatching message: ".postln();
      //("[supercollider-redux]: " ++ msg).postln();
      {socket.sendRaw(msg.asRawOSC())}.defer();
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
