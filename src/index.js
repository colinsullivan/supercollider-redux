import * as actionTypes from "./lib/actionTypes"
import * as actions from "./lib/actions"
import reducer, { DEFAULT_MOUNT_POINT } from "./lib/reducers"
import SCStoreController from "./lib/SCStoreController"

export default {
  actionTypes,
  actions,
  reducer,
  DEFAULT_MOUNT_POINT,
  SCStoreController
}
