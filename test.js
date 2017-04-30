
import chai from "chai"
import { createStore } from "redux"
import rootReducer from "./lib/reducers"

import SCStoreController from "./lib/SCStoreController"
const expect = chai.expect;

function configure_store () {
  return createStore(rootReducer);
}

describe("SCStoreController", function() {
  var store = configure_store();

  var scStoreController = new SCStoreController(store);

  it("should have started SC init", function (done) {
    let state = store.getState();

    expect(state.scStateStoreReadyState).to.equal("INIT");
    done();
  });

});
