/**
 *  @file       SCLangController.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2019 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import { resolveOptions, boot } from "@supercollider/lang";

import { scLangInit, scLangReady, scLangQuit } from "./actions";

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
    this.options = resolveOptions(sclangOptions);
    this.sclang = null;
  }
  boot() {
    this.store.dispatch(scLangInit());
    return new Promise((res, rej) => {
      return boot(this.options)
        .then(lang => {
          this.sclang = lang;

          lang.interpret(this.interpretOnLangBoot).then(() => {
            this.store.dispatch(scLangReady());
            res(lang);
          });
        })
        .catch(rej);
    });
  }
  quit() {
    return new Promise((resolve, reject) => {
      this.sclang
        .interpret(
          `
Server.freeAll();
Server.quitAll();
      `
        )
        .then(() => {
          this.sclang
            .quit()
            .then(() => {
              this.store.dispatch(scLangQuit());
              resolve();
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }
  getSCLang() {
    return this.sclang;
  }
}

export default SCLangController;
