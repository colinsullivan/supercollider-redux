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
import supercolliderRedux from "../"

import sc from "supercolliderjs"

const SCStoreController = supercolliderRedux.SCStoreController
const expect = chai.expect;

var rootReducer = combineReducers({
  [supercolliderRedux.DEFAULT_MOUNT_POINT]: supercolliderRedux.reducer,
  test: function (state = {}, action) {
    state.SCStoreControllerTest = false;
    state.SCStoreControllerPayloadTest = false;
    switch (action.type) {
      case 'SCSTORECONTROLLER_TEST':
        state.SCStoreControllerTest = true;
        break;

      case 'SCSTORECONTROLLER_PAYLOAD_TEST':
        state.SCStoreControllerPayloadTest = action.payload.hello;
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

var quarkDirectoryPath = path.resolve("./quarks/supercollider-redux/");
var sclang;

describe("SCStoreController", function() {
  var store = configure_store();

  var scStoreController;
  
  if (!process.env.EXTERNAL_SCLANG) {
    it("should start", function (done) {
      sc.resolveOptions(null, {
        debug: true
      }).then((options) => {
        options.includePaths = [
            quarkDirectoryPath
        ];
        options.debug = true;
        options.echo = true;
        sclang = new sc.lang.SCLang(options);

        sclang.boot().then(() => {
          sclang.interpret('API.mountDuplexOSC();').then(() => {
            done();
          }).catch(done);
        }).catch((err) => {
          console.log(err.data.stdout);
          done(new Error("sclang failed to boot"));
        });
      });
    });

    it("should have loaded our local quark", function (done) {
      sclang.interpret('Quarks.installedPaths();').then(function(answer) {
        expect(answer).to.include(quarkDirectoryPath);
        done();
      }, console.error);
    });
  }

  it("should have started SC init", function (done) {
    scStoreController = new SCStoreController(store);
    
    let state = store.getState();

    expect(
      state[supercolliderRedux.DEFAULT_MOUNT_POINT].scStateStoreReadyState
    ).to.equal("INIT");
    done();
  });

  var expectedInitTime = 150;
  it(`supercollider should respond in < ${expectedInitTime} ms`, function (done) {
    setTimeout(() => {
      let state = store.getState();

      expect(
        state[supercolliderRedux.DEFAULT_MOUNT_POINT].scStateStoreReadyState
      ).to.equal("READY");
      done();
    }, expectedInitTime);
  });

  it("should handle actions sent without a payload", function (done) {
    let unsub = store.subscribe(() => {
      let state = store.getState();
      expect(state.test.SCStoreControllerTest).to.equal(true);
      unsub();
      done();
    });
    sclang
      .interpret('StateStore.getInstance().dispatch((type: "SCSTORECONTROLLER_TEST"))')
      .catch(done);
  });

  it("should handle actions sent with a payload", function (done) {
    let unsub = store.subscribe(() => {
      let state = store.getState();
      expect(state.test.SCStoreControllerPayloadTest).to.equal("world");
      unsub();
      done();
    });
    sclang
      .interpret('StateStore.getInstance().dispatch((type: "SCSTORECONTROLLER_PAYLOAD_TEST", payload: (hello: "world")))')
      .catch(done);
  });

});
