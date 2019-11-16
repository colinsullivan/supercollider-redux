/**
 *  @file       reducers.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import {
  SC_STORE_INIT,
  SC_STORE_READY,
  SC_LANG_INIT,
  SC_LANG_READY,
  SC_LANG_QUIT,
  SC_SYNTH_READY
} from "./actionTypes";
import { READY_STATES } from "./constants";

export function create_default_state() {
  return {
    scStoreReadyState: READY_STATES.NOT_STARTED,
    scLangReadyState: READY_STATES.NOT_STARTED,
    scSynthReadyState: READY_STATES.NOT_STARTED
  };
}
export default function(state = create_default_state(), action) {
  switch (action.type) {
    case SC_STORE_INIT:
      return {
        ...state,
        scStoreReadyState: READY_STATES.INIT
      };

    case SC_STORE_READY:
      return {
        ...state,
        scStoreReadyState: READY_STATES.READY
      };

    case SC_LANG_INIT:
      return {
        ...state,
        scLangReadyState: READY_STATES.INIT,
        scSynthReadyState: READY_STATES.INIT
      };

    case SC_LANG_READY:
      return {
        ...state,
        scLangReadyState: READY_STATES.READY
      };

    case SC_LANG_QUIT:
      return {
        ...state,
        scLangReadyState: READY_STATES.NOT_STARTED
      };

    case SC_SYNTH_READY:
      return {
        ...state,
        scSynthReadyState: READY_STATES.READY
      };

    default:
      break;
  }
  return state;
}
