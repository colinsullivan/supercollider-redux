# supercollider-redux
State synchronization between a replica [SuperCollider](http://supercollider.github.io/) state store and a primary Node.js [Redux](http://redux.js.org/) state store.

Using the wonderful [supercolliderjs](https://github.com/crucialfelix/supercolliderjs) and [API quark](https://github.com/supercollider-quarks/API), a primary store set up in Node.js can forward state updates to a replica running in sclang.  The primary store can also receive actions dispatched from sclang (uses a separate OSC channel).

When actions are dispatched from sclang to the replica `StateStore` instance, they are passed up to the primary Node.js store via OSC, any reducers written in Node.js can update the state which will then be forwarded back to the replica.  The primary / replica design promotes all state changes written as reducers in Redux, centralizing the state in the Node.js process.  This is helpful when integrating other systems like graphics or LED renderers, arduino, etc.
