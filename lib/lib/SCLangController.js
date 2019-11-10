"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lang = require("@supercollider/lang");

var _actions = require("./actions");

/**
 *  @file       SCLangController.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2019 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

/**
 *  @class        SCLangController
 *
 *  @classdesc    Start sclang using @supercollider/lang, dispatching sclang
 *  ready state to store and running initial sclang commands needed for
 *  supercollider-redux to work through the API quark.
 **/
class SCLangController {
  /**
   *  Creates the SCLangController, reading the supercolliderjs config file
   *  with a call to `resolveOptions`.  Does not boot sclang.
   **/
  constructor(store, sclangOptions = {}) {
    this.store = store;
    this.options = (0, _lang.resolveOptions)(sclangOptions);
    this.sclang = null;
  }

  boot() {
    this.store.dispatch((0, _actions.scLangInit)());
    return new Promise((res, rej) => {
      return (0, _lang.boot)(this.options).then(lang => {
        this.sclang = lang;
        lang.interpret(`
          API.mountDuplexOSC();
          s.waitForBoot({
            SCReduxStore.getInstance().dispatch((
              type: SCRedux.actionTypes['SC_SYNTH_READY']
            ));
          });
          `).then(() => {
          this.store.dispatch((0, _actions.scLangReady)());
          res(lang);
        });
      }).catch(rej);
    });
  }

  quit() {
    return new Promise((resolve, reject) => {
      this.sclang.interpret(`
Server.freeAll();
Server.quitAll();
      `).then(() => {
        setTimeout(() => {
          this.sclang.quit().then(() => {
            this.store.dispatch((0, _actions.scLangQuit)());
            resolve();
          }).catch(reject);
        }, 1000);
      }).catch(reject);
    });
  }

  getSCLang() {
    return this.sclang;
  }

}

var _default = SCLangController;
exports.default = _default;