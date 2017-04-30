import * as actionTypes from "./actionTypes";
export function supercolliderReady () {
  return {
    type: actionTypes.SUPERCOLLIDER_READY
  };
}

export function supercolliderInitStarted () {
  return {
    type: actionTypes.SUPERCOLLIDER_INIT_START
  };
}
