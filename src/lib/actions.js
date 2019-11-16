/**
 *  @file       actions.js
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import {
  SC_STORE_READY,
  SC_STORE_INIT,
  SC_LANG_READY,
  SC_LANG_INIT,
  SC_LANG_QUIT
} from "./actionTypes";

export function scStoreReady() {
  return {
    type: SC_STORE_READY
  };
}

export function scStoreInit() {
  return {
    type: SC_STORE_INIT
  };
}

export function scLangInit() {
  return {
    type: SC_LANG_INIT
  };
}

export function scLangReady() {
  return {
    type: SC_LANG_READY
  };
}

export function scLangQuit() {
  return {
    type: SC_LANG_QUIT
  };
}
