"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SC_SYNTH_READY = exports.SC_LANG_QUIT = exports.SC_LANG_READY = exports.SC_LANG_INIT = exports.SC_STORE_READY = exports.SC_STORE_INIT = void 0;
// When the SCStoreController begins initializing the SCReduxStore in SuperCollider.
const SC_STORE_INIT = "SUPERCOLLIDER_REDUX-SC_STORE_INIT"; // The first action dispatched from the SCReduxStore to confirm the SuperCollider store is ready.

exports.SC_STORE_INIT = SC_STORE_INIT;
const SC_STORE_READY = "SUPERCOLLIDER_REDUX-SC_STORE_READY"; // When the SCLangController begins starting up sclang.

exports.SC_STORE_READY = SC_STORE_READY;
const SC_LANG_INIT = "SUPERCOLLIDER_REDUX-SC_LANG_INIT"; // When sclang is booted.

exports.SC_LANG_INIT = SC_LANG_INIT;
const SC_LANG_READY = "SUPERCOLLIDER_REDUX-SC_LANG_READY"; // When sclang has quit.

exports.SC_LANG_READY = SC_LANG_READY;
const SC_LANG_QUIT = "SUPERCOLLIDER_REDUX-SC_LANG_QUIT"; // When the SuperCollider server has booted

exports.SC_LANG_QUIT = SC_LANG_QUIT;
const SC_SYNTH_READY = "SUPERCOLLIDER_REDUX-SC_SYNTH_READY";
exports.SC_SYNTH_READY = SC_SYNTH_READY;