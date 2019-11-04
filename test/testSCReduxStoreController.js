/**
 *  @file       test.js
 *
 *	@desc       Tests and example code.
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import path from "path"
import chai from "chai"
import { createStore, combineReducers } from "redux"
import SCRedux from "../"

//import sc from "supercolliderjs"
import {resolveOptions, boot} from "@supercollider/lang";

const SCReduxStoreController = SCRedux.SCReduxStoreController
const expect = chai.expect;

var rootReducer = combineReducers({
  [SCRedux.DEFAULT_MOUNT_POINT]: SCRedux.reducer,
  test: function (state = {}, action) {
    state.SCReduxStoreControllerTest = false;
    state.SCReduxStoreControllerPayloadTest = false;
    switch (action.type) {
      case 'SCSTORECONTROLLER_TEST':
        state.SCReduxStoreControllerTest = true;
        break;

      case 'SCSTORECONTROLLER_PAYLOAD_TEST':
        state.SCReduxStoreControllerPayloadTest = action.payload.hello;
        break;
      
      default:
        break;
    }

    return state;
  }
});

function configure_store () {
  return createStore(rootReducer);
}

var quarkDirectoryPath = path.resolve("./quarks/supercollider-redux/"),
  sclang,
  scStoreController;

describe("SCReduxStoreController", function() {
  var store = configure_store();
  
  if (!process.env.EXTERNAL_SCLANG) {
    it("should start", function (done) {
      const options = resolveOptions({
        debug: true,
        echo: true
      });
      boot(options).then((lang) => {
        sclang = lang;
        lang.interpret('API.mountDuplexOSC();').then(() => {
          done();
        }).catch(done);
      }).catch((err) => {
        console.log("err");
        console.log(err);
        done(new Error("sclang failed to boot"));
      });
    });

    it("should have loaded our local quark", function (done) {
      sclang.interpret('Quarks.installedPaths();').then(function(answer) {
        expect(answer).to.include(quarkDirectoryPath);
        done();
      }, console.error);
    });
  }

  it("should have started SC init", function () {
    scStoreController = new SCReduxStoreController(store);
    
    let state = store.getState();

    expect(
      state[SCRedux.DEFAULT_MOUNT_POINT].scStoreReadyState
    ).to.equal("INIT");
  });

  var expectedInitTime = 450;
  it(`supercollider should respond in < ${expectedInitTime} ms`, function (done) {
    setTimeout(() => {
      let state = store.getState();

      expect(
        state[SCRedux.DEFAULT_MOUNT_POINT].scStoreReadyState
      ).to.equal("READY");
      done();
    }, expectedInitTime);
  });

  it("should handle actions sent without a payload", function (done) {
    let unsub = store.subscribe(() => {
      let state = store.getState();
      expect(state.test.SCReduxStoreControllerTest).to.equal(true);
      unsub();
      done();
    });
    sclang
      .interpret('SCReduxStore.getInstance().dispatch((type: "SCSTORECONTROLLER_TEST"))')
      .catch(done);
  });

  it("should handle actions sent with a payload", function (done) {
    let unsub = store.subscribe(() => {
      let state = store.getState();
      expect(state.test.SCReduxStoreControllerPayloadTest).to.equal("world");
      unsub();
      done();
    });
    sclang
      .interpret('SCReduxStore.getInstance().dispatch((type: "SCSTORECONTROLLER_PAYLOAD_TEST", payload: (hello: "world")))')
      .catch(done);
  });

  it('should quit supercollider', function (done) {
    scStoreController.disconnect();
    sclang.quit().then(() => done());
  });

});
