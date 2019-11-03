# supercollider-redux

[![Build Status](https://travis-ci.com/colinsullivan/supercollider-redux.svg?branch=master)](https://travis-ci.com/colinsullivan/supercollider-redux)

A library for state synchronization between SuperCollider and Node.js using the [Flux design pattern](https://facebook.github.io/flux/docs/in-depth-overview/).  State flows from a primary state store in Node.js to a replica in SuperCollider which can dispatch actions back to the Node.js store.

![Basic state flow](docs/flow.png "Basic state flow")

## How it works
Intended for use with a primary state store in Node.js implemented with [Redux](http://redux.js.org/).  Provides `StateStore`, a replica state store in [SuperCollider](http://supercollider.github.io/) which leverages the [API quark](https://github.com/supercollider-quarks/API) to receive state changes and the JSON converter in [supercolliderjs](https://github.com/crucialfelix/supercolliderjs) to dispatch actions back to Node.js.

The Node.js class `SCStoreController` forwards state updates to a replica running in sclang and receives actions dispatched from it using a separate OSC channel.

When actions are dispatched from sclang to the replica `StateStore` instance, they are passed up to the primary Node.js store via OSC, any reducers written in Node.js can update the state which will then be forwarded back to the replica.  The primary / replica design promotes all state changes written as reducers in Redux, centralizing the state in the Node.js process.

## SuperCollider Classes
All SuperCollider code is included in a [quark](http://doc.sccode.org/Guides/UsingQuarks.html) inside the `quarks/supercollider-redux` directory.

* `ReduxEventStreamPlayer`: This is a subclass of `EventStreamPlayer` which will dispatch actions each time an event from the stream is played.  Very useful for modifying other state based on the playback of a Pattern, for example.
* `SCReduxTempoClockController`
    * A wrapper for TempoClock which will take a tempo from the Redux store.

## JavaScript Classes
* `SCStoreController`
    * Sends initial state to SuperCollider StateStore
    * Forwards subsequent state changes to it
    * Creates an `OSCActionListener` to listen for actions
* `OSCActionListener`
    * Listens for actions on OSC port and dispatches to store

## Use Cases
* [Transdimensional Audio Workstation](https://colin-sullivan.net/main/2016/transdimensional-audio-workstation/)
* [Touch UI to Generative Music Sequencer in SuperCollider](https://colin-sullivan.net/main/2019/performance-environment/)
