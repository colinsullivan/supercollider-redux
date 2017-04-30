import * as actionTypes from "./actionTypes";

export function create_default_state () {
  return {
    scStateStoreReadyState: null
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
