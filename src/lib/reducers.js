/**
 *  @file       reducers.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import * as actionTypes from "./actionTypes";
import { READY_STATES } from "./constants";

export function create_default_state() {
  return {
    scStoreReadyState: READY_STATES.NOT_STARTED,
    scLangReadyState: READY_STATES.NOT_STARTED
  };
}
export default function(state = create_default_state(), action) {
  switch (action.type) {
    case actionTypes.SC_STORE_INIT:
      state.scStoreReadyState = READY_STATES.INIT;
      break;

    case actionTypes.SC_STORE_READY:
      state.scStoreReadyState = READY_STATES.READY;
      break;

    default:
      break;
  }
  return state;
}
