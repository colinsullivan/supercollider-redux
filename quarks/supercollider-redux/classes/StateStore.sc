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
 *  dispatches actions back up to the primary state store.
 **/
StateStore {
  classvar <>instance;
  var state,
    subscribers,
    primaryStoreSocket;

  *new {
    arg initialState;
    ^super.new.init(initialState);
  }
  *getInstance {

    //"TawController.getInstance".postln();

    //"this.instance:".postln;
    //this.instance.postln;
    if (this.instance == nil, {
      this.instance = StateStore.new(());
    });

    ^this.instance;
  }
  init {
    arg initialState;

    state = initialState;

    subscribers = List.new();

    primaryStoreSocket = Server.new(\primaryStore, NetAddr.new("127.0.0.1", 3334))

    ^this;
  }

  dispatch {
    arg action;
    var actionPairs = action.getPairs();
    primaryStoreSocket.listSendMsg(["/dispatch"] ++ actionPairs);
  }

  subscribe {
    arg newSubscriber;
    subscribers.add(newSubscriber);
  }

  getState {
    ^state;
  }

  setState {
    arg newState;

    //"setState".postln();

    state = newState;

    subscribers.do({
      arg subscriber;

      subscriber.handleStateChange();
    });
  }
}
