# supercollider-redux
State synchronization between a replica [SuperCollider](http://supercollider.github.io/) state store and a primary Node.js [Redux](http://redux.js.org/) state store.

Using the wonderful [supercolliderjs](https://github.com/crucialfelix/supercolliderjs) and [API quark](https://github.com/supercollider-quarks/API), a primary store set up in Node.js can forward state updates to a replica running in sclang.  The primary store can also receive actions dispatched from sclang (uses a separate OSC channel).

When actions are dispatched from sclang to the replica `StateStore` instance, they are passed up to the primary Node.js store via OSC, any reducers written in Node.js can update the state which will then be forwarded back to the replica.  The primary / replica design promotes all state changes written as reducers in Redux, centralizing the state in the Node.js process.  This is helpful when integrating other systems like graphics or LED renderers, arduino, etc.

## SuperCollider Classes
In the `quarks/supercollider-redux` directory, there are some helper modules:

* `AbletonTempoClockController`: This is a wrapper for TempoClock which will make sure a TempoClock stays in sync with Ableton Link.  Note this requires the [abletonlink-redux](https://github.com/colinsullivan/abletonlink-redux/) package.
* `ReduxEventStreamPlayer`: This is a subclass of `EventStreamPlayer` which will dispatch actions each time an event from the stream is played.  Very useful for modifying other state based on the playback of a Pattern, for example.  See the [awakening-sequencers](https://github.com/colinsullivan/awakening-sequencers) repository for a demonstration.
