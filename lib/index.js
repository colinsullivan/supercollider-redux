"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var actionTypes = __importStar(require("./lib/actionTypes"));
var actions = __importStar(require("./lib/actions"));
var reducers_1 = __importDefault(require("./lib/reducers"));
var SCStoreController_1 = __importDefault(require("./lib/SCStoreController"));
var SCLangController_1 = __importDefault(require("./lib/SCLangController"));
var OSCActionListener_1 = __importDefault(require("./lib/OSCActionListener"));
var constants_1 = require("./lib/constants");
var SCReduxController_1 = __importDefault(require("./lib/SCReduxController"));
exports["default"] = {
    actionTypes: actionTypes,
    actions: actions,
    reducer: reducers_1["default"],
    DEFAULT_MOUNT_POINT: constants_1.DEFAULT_MOUNT_POINT,
    SCStoreController: SCStoreController_1["default"],
    SCLangController: SCLangController_1["default"],
    OSCActionListener: OSCActionListener_1["default"],
    SCReduxController: SCReduxController_1["default"],
    READY_STATES: constants_1.READY_STATES
};
