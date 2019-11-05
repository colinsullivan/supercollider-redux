import * as actionTypes from "./lib/actionTypes";
import * as actions from "./lib/actions";
import reducer from "./lib/reducers";
import SCStoreController from "./lib/SCStoreController";
import SCLangController from "./lib/SCLangController";
import OSCActionListener from "./lib/OSCActionListener";
import { READY_STATES, DEFAULT_MOUNT_POINT } from "./lib/constants";

export default {
  actionTypes,
  actions,
  reducer,
  DEFAULT_MOUNT_POINT,
  SCStoreController,
  SCLangController,
  OSCActionListener,
  READY_STATES
};
