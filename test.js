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
import { createStore } from "redux"
import rootReducer from "./lib/reducers"

import sc from "supercolliderjs"

import SCStoreController from "./lib/SCStoreController"
const expect = chai.expect;

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

    expect(state.scStateStoreReadyState).to.equal("INIT");
    done();
  });

  var expectedInitTime = 150;
  it(`supercollider should respond in < ${expectedInitTime} ms`, function (done) {
    setTimeout(() => {
      let state = store.getState();

      expect(state.scStateStoreReadyState).to.equal("READY");
      done();
    }, expectedInitTime);
  });

});
