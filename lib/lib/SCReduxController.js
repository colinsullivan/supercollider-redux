"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SCStoreController = _interopRequireDefault(require("./SCStoreController"));

var _SCLangController = _interopRequireDefault(require("./SCLangController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  @class        SCReduxController
 *
 *  @classdesc    A top-level interface for launching SuperCollider and setting
 *  up the SCReduxStore.
 *
 *  @param  {Object}  props - See SCLangController and SCStoreController for
 *  the possible options.
 **/
class SCReduxController {
  constructor(store, props) {
    this.sclangController = new _SCLangController.default(store, props);
    this.scStoreController = new _SCStoreController.default(store, props);
  }
  /**
   *  Start SuperCollider, initialize the replica state store, and set up a
   *  channels for sending state and receiving actions.
   *
   *  @return {Promise} - Resolves when sclang has booted and store is ready.
   **/


  boot() {
    return new Promise((res, rej) => {
      this.sclangController.boot().then(() => {
        this.scStoreController.init().then(res).catch(rej);
      }).catch(rej);
    });
  }
  /**
   *  A helper method to get the `@supercolliderjs/lang` `SCLang` instance.
   **/


  getSCLang() {
    return this.sclangController.getSCLang();
  }
  /**
   *  Stop all interfaces and shutdown SuperCollider.
   *
   *  @return {Promise} - Resolves when everything has shutdown.
   **/


  quit() {
    return new Promise((res, rej) => {
      this.scStoreController.quit();
      this.sclangController.quit().then(res).catch(rej);
    });
  }

}

var _default = SCReduxController;
exports.default = _default;