declare namespace _default {
    export { actionTypes };
    export { actions };
    export { reducer };
    export { DEFAULT_MOUNT_POINT };
    export { SCStoreController };
    export { SCLangController };
    export { OSCActionListener };
    export { SCReduxController };
    export { READY_STATES };
}
export default _default;
import * as actionTypes from "./lib/actionTypes";
import * as actions from "./lib/actions";
import reducer from "./lib/reducers";
import { DEFAULT_MOUNT_POINT } from "./lib/constants";
import SCStoreController from "./lib/SCStoreController";
import SCLangController from "./lib/SCLangController";
import OSCActionListener from "./lib/OSCActionListener";
import SCReduxController from "./lib/SCReduxController";
import { READY_STATES } from "./lib/constants";
