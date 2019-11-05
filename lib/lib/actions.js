"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scStoreReady = scStoreReady;
exports.scStoreInit = scStoreInit;
exports.scLangInit = scLangInit;
exports.scLangReady = scLangReady;
exports.scLangQuit = scLangQuit;

var _actionTypes = require("./actionTypes");

/**
 *  @file       actions.js
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/
function scStoreReady() {
  return {
    type: _actionTypes.SC_STORE_READY
  };
}

function scStoreInit() {
  return {
    type: _actionTypes.SC_STORE_INIT
  };
}

function scLangInit() {
  return {
    type: _actionTypes.SC_LANG_INIT
  };
}

function scLangReady() {
  return {
    type: _actionTypes.SC_LANG_READY
  };
}

function scLangQuit() {
  return {
    type: _actionTypes.SC_LANG_QUIT
  };
}