/**
 *  @file       actions.js
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import * as actionTypes from "./actionTypes";
export function scStoreReady() {
  return {
    type: actionTypes.SC_STORE_READY
  };
}

export function scStoreInit() {
  return {
    type: actionTypes.SC_STORE_INIT
  };
}
