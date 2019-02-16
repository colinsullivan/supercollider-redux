# supercollider-redux

[![Build Status](https://travis-ci.com/colinsullivan/supercollider-redux.svg?branch=master)](https://travis-ci.com/colinsullivan/supercollider-redux)

State synchronization between a replica [SuperCollider](http://supercollider.github.io/) state store and a primary Node.js [Redux](http://redux.js.org/) state store.

Using [supercolliderjs](https://github.com/crucialfelix/supercolliderjs) and the [API quark](https://github.com/supercollider-quarks/API), a primary store set up in Node.js forwards state updates to a replica running in sclang.  The primary store can also receive actions dispatched from sclang (uses a separate OSC channel).

When actions are dispatched from sclang to the replica `StateStore` instance, they are passed up to the primary Node.js store via OSC, any reducers written in Node.js can update the state which will then be forwarded back to the replica.  The primary / replica design promotes all state changes written as reducers in Redux, centralizing the state in the Node.js process.

## SuperCollider Classes
In the `quarks/supercollider-redux` directory, there are some helper modules:

* `ReduxTempoClockController`: This is a wrapper for TempoClock which will take a tempo from the Redux store.
* `ReduxEventStreamPlayer`: This is a subclass of `EventStreamPlayer` which will dispatch actions each time an event from the stream is played.  Very useful for modifying other state based on the playback of a Pattern, for example.

## JavaScript Classes
* `SCStoreController`: Initializes the replica state store in SuperCollider and forwards state changes to it.

## Use Cases
* [Transdimensional Audio Workstation](https://colin-sullivan.net/main/2016/transdimensional-audio-workstation/)
* [Touch UI to Generative Music Sequencer in SuperCollider](https://colin-sullivan.net/main/2019/performance-environment/)
