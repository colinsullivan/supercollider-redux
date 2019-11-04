"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create_default_state = create_default_state;
exports["default"] = _default;

var actionTypes = _interopRequireWildcard(require("./actionTypes"));

var _constants = require("./constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
    scStoreReadyState: _constants.READY_STATES.NOT_STARTED,
    scLangReadyState: _constants.READY_STATES.NOT_STARTED
  };
}

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : create_default_state();
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actionTypes.SC_STORE_INIT:
      state.scStoreReadyState = _constants.READY_STATES.INIT;
      break;

    case actionTypes.SC_STORE_READY:
      state.scStoreReadyState = _constants.READY_STATES.READY;
      break;

    default:
      break;
  }

  return state;
}