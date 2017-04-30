(
  init: {
    arg reply, initialState;
    var store = StateStore.getInstance();
    "StateStore.api.init".postln();
    store.setState(initialState);
    reply.value((status: "ok"));
  },
  setState: {
    arg reply, state;
    var store = StateStore.getInstance();
    //"taw.api.setState".postln;
    store.setState(state);
    reply.value();
  }
);
