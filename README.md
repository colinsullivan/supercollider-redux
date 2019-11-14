# supercollider-redux

[![Build Status](https://travis-ci.com/colinsullivan/supercollider-redux.svg?branch=master)](https://travis-ci.com/colinsullivan/supercollider-redux)

A library for state synchronization between SuperCollider and Node.js using the [Flux design pattern](https://facebook.github.io/flux/docs/in-depth-overview/).  State flows from a primary state store in Node.js to a replica in SuperCollider which can dispatch actions back to the Node.js store.

![Basic state flow](docs/flow.png "Basic state flow")

## How it works
Intended for use with a primary state store in Node.js implemented with [Redux](http://redux.js.org/).  Provides `StateStore`, a replica state store in [SuperCollider](http://supercollider.github.io/) which leverages [supercolliderjs](https://github.com/crucialfelix/supercolliderjs) and the [API quark](https://github.com/supercollider-quarks/API) to receive state changes.

The Node.js class `SCStoreController` forwards state updates to a replica running in sclang and receives actions dispatched from it using a separate OSC channel.

When actions are dispatched from sclang to the replica `StateStore` instance, they are passed up to the primary Node.js store via OSC, any reducers written in Node.js can update the state which will then be forwarded back to the replica.  The primary / replica design promotes all state changes written as reducers in Redux, centralizing the state in the Node.js process.

## SuperCollider Classes
All SuperCollider code is included in a [quark](http://doc.sccode.org/Guides/UsingQuarks.html) inside the `quarks/supercollider-redux` directory.

* `SCRedux`: Used as a namespace for storing constants like actionTypes.
* `SCReduxStore`: Class that implements the state store replica in SuperCollider.
* `SCReduxTempoClockController`: A wrapper for TempoClock which will take a tempo from the Redux store.

## JavaScript Module
### Actions

### Reducer

### Constants

### Classes
* `SCLangController`
    * Starts sclang
    * Dispatches actions to store sclang and scsynth boot state
    * Optionally takes a string for sclang to interpret when it is booted, helpful for initial setup or configuring audio devices before the server starts.
* `SCStoreController`
    * Sends initial state to SuperCollider StateStore
    * Forwards subsequent state changes to it
    * Creates an `OSCActionListener` to listen for actions
* `OSCActionListener`
    * Listens for actions on OSC port and dispatches to store

## Use Cases
* [Transdimensional Audio Workstation](https://colin-sullivan.net/main/2016/transdimensional-audio-workstation/)
* [Touch UI to Generative Music Sequencer in SuperCollider](https://colin-sullivan.net/main/2019/performance-environment/)
