import { expect } from "chai";
import { createStore, combineReducers } from "redux";

import SCRedux from "../src/";

const rootReducer = combineReducers({
  [SCRedux.DEFAULT_MOUNT_POINT]: SCRedux.reducer
});

describe("SCLangController", function() {
  const store = createStore(rootReducer);
  let sclangController, scStoreController;

  it("should instantiate without starting sclang", function() {
    sclangController = new SCRedux.SCLangController(store);

    const state = store.getState()[SCRedux.DEFAULT_MOUNT_POINT];

    expect(state.scLangReadyState).to.equal(
      SCRedux.READY_STATES.NOT_STARTED
    );
  });

  let bootRes;
  it("should return a promise on boot", function() {
    bootRes = sclangController.boot();
    expect(bootRes).to.be.an.instanceof(Promise);
  });

  it("should change sclang ready state on boot", function() {
    const state = store.getState()[SCRedux.DEFAULT_MOUNT_POINT];
    expect(state.scLangReadyState).to.equal(
      SCRedux.READY_STATES.INIT
    );
  });

  it("should finish booting", function(done) {
    bootRes.then(() => {
      scStoreController = new SCRedux.SCStoreController(store);
      done();
    }).catch(done);
  });

  it("should change sclang ready state when finished", function() {
    const state = store.getState()[SCRedux.DEFAULT_MOUNT_POINT];
    expect(state.scLangReadyState).to.equal(
      SCRedux.READY_STATES.READY
    );
  });

  it('should change scsynth ready state when booted', function (done) {
    const state = store.getState()[SCRedux.DEFAULT_MOUNT_POINT];
    expect(state.scSynthReadyState).to.equal(
      SCRedux.READY_STATES.INIT
    );
    const unsub = store.subscribe(() => {
      const newState = store.getState()[SCRedux.DEFAULT_MOUNT_POINT];
      if (newState.scSynthReadyState !== state.scSynthReadyState) {
        expect(newState.scSynthReadyState).to.equal(
          SCRedux.READY_STATES.READY
        );
        unsub();
        done();
      }
    })
  });

  it("Should quit sclang", function(done) {
    scStoreController.quit();
    const quitRes = sclangController.quit();

    expect(quitRes).to.be.an.instanceof(Promise);

    quitRes.catch(done).then(() => {
      const state = store.getState()[SCRedux.DEFAULT_MOUNT_POINT];
      expect(state.scLangReadyState).to.equal(
        SCRedux.READY_STATES.NOT_STARTED
      );
      done();
    });
  });
});
