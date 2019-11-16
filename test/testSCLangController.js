import path from "path";
import { expect } from "chai";
import { createStore, combineReducers } from "redux";

import SCRedux from "../src/";

const rootReducer = combineReducers({
  [SCRedux.DEFAULT_MOUNT_POINT]: SCRedux.reducer
});

describe("SCLangController", function() {
  const store = createStore(rootReducer);
  let sclangController;

  before(function () {
    sclangController = new SCRedux.SCLangController(store, {
      interpretOnLangBoot: `
s.options.inDevice = "JackRouter";
s.options.outDevice = "JackRouter";
`
    });
  });

  it("should instantiate without starting sclang", function() {
    const state = store.getState()[SCRedux.DEFAULT_MOUNT_POINT];
    expect(state.scLangReadyState).to.equal(SCRedux.READY_STATES.NOT_STARTED);
  });

  let bootRes;
  it("should return a promise on boot", function() {
    bootRes = sclangController.boot();
    expect(bootRes).to.be.an.instanceof(Promise);
  });

  it("should change sclang ready state on boot", function() {
    const state = store.getState()[SCRedux.DEFAULT_MOUNT_POINT];
    expect(state.scLangReadyState).to.equal(SCRedux.READY_STATES.INIT);
  });

  it("should finish booting", function(done) {
    bootRes.then(() => done()).catch(done);
  });

  it("should have loaded our local quark", function(done) {
    const quarkDirectoryPath = path.resolve("./quarks/supercollider-redux/");
    sclangController
      .getSCLang()
      .interpret("Quarks.installedPaths();")
      .then(function(answer) {
        expect(answer).to.include(
          quarkDirectoryPath,
          "Quarks does not include the supercollider-redux quark in this directory."
        );
        done();
      })
      .catch(done);
  });

  it("should change sclang ready state when finished", function() {
    const state = store.getState()[SCRedux.DEFAULT_MOUNT_POINT];
    expect(state.scLangReadyState).to.equal(SCRedux.READY_STATES.READY);
  });

  after(function (done) {
    //scStoreController.quit();
    const quitRes = sclangController.quit();

    expect(quitRes).to.be.an.instanceof(Promise);

    quitRes.catch(done).then(() => {
      const state = store.getState()[SCRedux.DEFAULT_MOUNT_POINT];
      expect(state.scLangReadyState).to.equal(SCRedux.READY_STATES.NOT_STARTED);
      done();
    });
  });
});
