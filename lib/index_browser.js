"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var actionTypes = _interopRequireWildcard(require("./lib/actionTypes"));

var actions = _interopRequireWildcard(require("./lib/actions"));

var _reducers = _interopRequireWildcard(require("./lib/reducers"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var _default = {
  actionTypes: actionTypes,
  actions: actions,
  reducer: _reducers.default,
  DEFAULT_MOUNT_POINT: _reducers.DEFAULT_MOUNT_POINT
};
exports.default = _default;