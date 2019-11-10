"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create_default_state = create_default_state;
exports.default = _default;

var _actionTypes = require("./actionTypes");

var _constants = require("./constants");

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
    scLangReadyState: _constants.READY_STATES.NOT_STARTED,
    scSynthReadyState: _constants.READY_STATES.NOT_STARTED
  };
}

function _default(state = create_default_state(), action) {
  switch (action.type) {
    case _actionTypes.SC_STORE_INIT:
      return { ...state,
        scStoreReadyState: _constants.READY_STATES.INIT
      };

    case _actionTypes.SC_STORE_READY:
      return { ...state,
        scStoreReadyState: _constants.READY_STATES.READY
      };

    case _actionTypes.SC_LANG_INIT:
      return { ...state,
        scLangReadyState: _constants.READY_STATES.INIT,
        scSynthReadyState: _constants.READY_STATES.INIT
      };

    case _actionTypes.SC_LANG_READY:
      return { ...state,
        scLangReadyState: _constants.READY_STATES.READY
      };

    case _actionTypes.SC_LANG_QUIT:
      return { ...state,
        scLangReadyState: _constants.READY_STATES.NOT_STARTED
      };

    case _actionTypes.SC_SYNTH_READY:
      return { ...state,
        scSynthReadyState: _constants.READY_STATES.READY
      };

    default:
      break;
  }

  return state;
}