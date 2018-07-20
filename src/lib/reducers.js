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

export const DEFAULT_MOUNT_POINT = 'supercolliderRedux';

export function create_default_state () {
  return {
    scStateStoreReadyState: "NOT_STARTED"
  };
}
export default function (state = create_default_state(), action) {
  switch (action.type) {
    case actionTypes.SUPERCOLLIDER_INIT_START:
      state.scStateStoreReadyState = "INIT";
      break;

    case actionTypes.SUPERCOLLIDER_READY:
      state.scStateStoreReadyState = "READY";
      break;

    default:
      break;
  }
  return state;
}
