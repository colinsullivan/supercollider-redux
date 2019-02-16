"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create_default_state = create_default_state;
exports.default = _default;

var actionTypes = _interopRequireWildcard(require("./actionTypes"));

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 *  @file       reducers.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/
function create_default_state() {
  return {
    scStateStoreReadyState: _constants.STORE_READY_STATES.NOT_STARTED
  };
}

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : create_default_state();
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actionTypes.SUPERCOLLIDER_INIT_START:
      state.scStateStoreReadyState = _constants.STORE_READY_STATES.INIT;
      break;

    case actionTypes.SUPERCOLLIDER_READY:
      state.scStateStoreReadyState = _constants.STORE_READY_STATES.READY;
      break;

    default:
      break;
  }

  return state;
}