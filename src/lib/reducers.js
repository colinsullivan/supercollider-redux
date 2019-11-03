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
import { STORE_READY_STATES, DEFAULT_MOUNT_POINT } from "./constants";

export function create_default_state() {
  return {
    scStateStoreReadyState: STORE_READY_STATES.NOT_STARTED
  };
}
export default function(state = create_default_state(), action) {
  switch (action.type) {
    case actionTypes.SUPERCOLLIDER_INIT_START:
      state.scStateStoreReadyState = STORE_READY_STATES.INIT;
      break;

    case actionTypes.SUPERCOLLIDER_READY:
      state.scStateStoreReadyState = STORE_READY_STATES.READY;
      break;

    default:
      break;
  }
  return state;
}
