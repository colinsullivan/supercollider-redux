import { expect } from "chai";
import { createStore, combineReducers } from "redux";

import SCRedux from "../src/";

const rootReducer = combineReducers({
  [SCRedux.DEFAULT_MOUNT_POINT]: SCRedux.reducer
});

describe("SCLangController", function() {
  const store = createStore(rootReducer);
  let sclangController;

  it("should instantiate without starting sclang", function() {
    sclangController = new SCRedux.SCLangController(store);

    const state = store.getState();

    expect(state[SCRedux.DEFAULT_MOUNT_POINT].scLangReadyState).to.equal(
      SCRedux.READY_STATES.NOT_STARTED
    );
  });

  let bootRes;
  it("should return a promise on boot", function() {
    bootRes = sclangController.boot();
    expect(bootRes).to.be.an.instanceof(Promise);
  });

  it("should change sclang ready state on boot", function() {
    const state = store.getState();
    expect(state[SCRedux.DEFAULT_MOUNT_POINT].scLangReadyState).to.equal(
      SCRedux.READY_STATES.INIT
    );
  });

  it("should finish booting", function(done) {
    bootRes.then(() => done()).catch(done);
  });

  it("should change sclang ready state when finished", function() {
    const state = store.getState();
    expect(state[SCRedux.DEFAULT_MOUNT_POINT].scLangReadyState).to.equal(
      SCRedux.READY_STATES.READY
    );
  });

  it("Should quit sclang", function(done) {
    const quitRes = sclangController.quit();

    expect(quitRes).to.be.an.instanceof(Promise);

    quitRes.catch(done).then(() => {
      const state = store.getState();
      expect(state[SCRedux.DEFAULT_MOUNT_POINT].scLangReadyState).to.equal(
        SCRedux.READY_STATES.NOT_STARTED
      );
      done();
    });
  });
});
