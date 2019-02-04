'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_MOUNT_POINT = undefined;
exports.create_default_state = create_default_state;

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : create_default_state();
  var action = arguments[1];

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
};

var _actionTypes = require('./actionTypes');

var actionTypes = _interopRequireWildcard(_actionTypes);

var _constants = require('./constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 *  @file       reducers.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

var DEFAULT_MOUNT_POINT = exports.DEFAULT_MOUNT_POINT = 'supercolliderRedux';

function create_default_state() {
  return {
    scStateStoreReadyState: _constants.STORE_READY_STATES.NOT_STARTED
  };
}