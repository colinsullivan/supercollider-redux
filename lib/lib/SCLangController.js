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
 *  @classdesc    Start sclang using @supercollider/lang, dispatch actions
 *  during init sequence, set up a dispatch to run within sclang once scsynth
 *  has started.
 **/
class SCLangController {
  /**
   *  Creates the SCLangController, reading the supercolliderjs config file
   *  with a call to `resolveOptions`.  Does not boot sclang.
   *
   *  @param  {redux.Store}  store - The state store.
   *  @param  {Object}  props.sclangOptions - Options for supercolliderjs
   **/
  constructor(store, props = {}) {
    const {
      sclangOptions = {},
      interpretOnLangBoot = ""
    } = props;
    this.interpretOnLangBoot = `
API.mountDuplexOSC();
${interpretOnLangBoot}
s.waitForBoot({
  SCReduxStore.getInstance().dispatch((
    type: SCRedux.actionTypes['SC_SYNTH_READY']
  ));
});
    `;
    this.store = store;
    this.options = (0, _lang.resolveOptions)(sclangOptions);
    this.sclang = null;
  }

  boot() {
    this.store.dispatch((0, _actions.scLangInit)());
    return new Promise((res, rej) => {
      return (0, _lang.boot)(this.options).then(lang => {
        this.sclang = lang;
        lang.interpret(this.interpretOnLangBoot).then(() => {
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
        this.sclang.quit().then(() => {
          this.store.dispatch((0, _actions.scLangQuit)());
          resolve();
        }).catch(reject);
      }).catch(reject);
    });
  }

  getSCLang() {
    return this.sclang;
  }

}

var _default = SCLangController;
exports.default = _default;