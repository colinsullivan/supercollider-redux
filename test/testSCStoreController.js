/**
 *  @file       testSCStoreController.js
 *
 *	@desc       Tests the SCStoreController class.
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import chai from "chai";
import { createStore, combineReducers } from "redux";
import SCRedux from "../src/";

const expect = chai.expect;

var rootReducer = combineReducers({
  [SCRedux.DEFAULT_MOUNT_POINT]: SCRedux.reducer,
  test: function(state = {}, action) {
    state.SCStoreControllerTest = false;
    state.SCStoreControllerPayloadTest = false;
    switch (action.type) {
      case "SCSTORECONTROLLER_TEST":
        state.SCStoreControllerTest = true;
        break;

      case "SCSTORECONTROLLER_PAYLOAD_TEST":
        state.SCStoreControllerPayloadTest = action.payload.hello;
        break;

      default:
        break;
    }

    return state;
  }
});

//function configure_store() {
  //return createStore(rootReducer);
//}

const {READY_STATES, SCLangController, SCStoreController} = SCRedux;

describe("SCStoreController", function() {

  const store = createStore(rootReducer);
  let sclangController, scStoreController, sclang;


  it("should have set store ready state on boot", function(done) {
    sclangController = new SCLangController(store);
    scStoreController = new SCStoreController(store);
    let state = store.getState()[SCRedux.DEFAULT_MOUNT_POINT];

    expect(state.scStoreReadyState).to.equal(READY_STATES.NOT_STARTED);

    sclangController.boot().then((lang) => {
      sclang = lang;

      scStoreController.init().then(() => {
        state = store.getState()[SCRedux.DEFAULT_MOUNT_POINT]

        expect(state.scStoreReadyState).to.equal(
          READY_STATES.INIT
        );
        done();
      }).catch(done);

    }).catch(done);

  });

  var expectedInitTime = 450;
  it(`supercollider should respond in < ${expectedInitTime} ms`, function(done) {
    setTimeout(() => {
      const state = store.getState();

      expect(state[SCRedux.DEFAULT_MOUNT_POINT].scStoreReadyState).to.equal(
        "READY"
      );
      done();
    }, expectedInitTime);
  });

  it("should handle actions sent without a payload", function(done) {
    const unsub = store.subscribe(() => {
      const state = store.getState();
      expect(state.test.SCStoreControllerTest).to.equal(true);
      unsub();
      done();
    });
    sclang
      .interpret(
        'SCReduxStore.getInstance().dispatch((type: "SCSTORECONTROLLER_TEST"))'
      )
      .catch(done);
  });

  it("should handle actions sent with a payload", function(done) {
    const unsub = store.subscribe(() => {
      const state = store.getState();
      expect(state.test.SCStoreControllerPayloadTest).to.equal("world");
      unsub();
      done();
    });
    sclang
      .interpret(
        'SCReduxStore.getInstance().dispatch((type: "SCSTORECONTROLLER_PAYLOAD_TEST", payload: (hello: "world")))'
      )
      .catch(done);
  });

  it("should quit supercollider", function(done) {
    scStoreController.quit();
    sclang.quit().then(() => done());
  });
});
