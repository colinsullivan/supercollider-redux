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
    this.options = resolveOptions(sclangOptions);
    this.sclang = null;
  }
  boot() {
    this.store.dispatch(scLangInit());
    return new Promise((res, rej) => {
      return boot(this.options)
        .then(lang => {
          this.sclang = lang;

          lang.interpret("API.mountDuplexOSC();");
          this.store.dispatch(scLangReady());
          res(lang);
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
          setTimeout(() => {
            this.sclang
              .quit()
              .then(() => {
                this.store.dispatch(scLangQuit());
                resolve();
              })
              .catch(reject);
          }, 1000);
        })
        .catch(reject);
    });
  }
  getSCLang() {
    return this.sclang;
  }
}

export default SCLangController;
