"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var actionTypes = _interopRequireWildcard(require("./lib/actionTypes"));

var actions = _interopRequireWildcard(require("./lib/actions"));

var _reducers = _interopRequireDefault(require("./lib/reducers"));

var _SCStoreController = _interopRequireDefault(require("./lib/SCStoreController"));

var _SCLangController = _interopRequireDefault(require("./lib/SCLangController"));

var _OSCActionListener = _interopRequireDefault(require("./lib/OSCActionListener"));

var _constants = require("./lib/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = {
  actionTypes,
  actions,
  reducer: _reducers.default,
  DEFAULT_MOUNT_POINT: _constants.DEFAULT_MOUNT_POINT,
  SCStoreController: _SCStoreController.default,
  SCLangController: _SCLangController.default,
  OSCActionListener: _OSCActionListener.default,
  READY_STATES: _constants.READY_STATES
};
exports.default = _default;