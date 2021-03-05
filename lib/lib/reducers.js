"use strict";
/**
 *  @file       reducers.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.create_default_state = void 0;
var actionTypes_1 = require("./actionTypes");
var constants_1 = require("./constants");
function create_default_state() {
    return {
        scStoreReadyState: constants_1.READY_STATES.NOT_STARTED,
        scLangReadyState: constants_1.READY_STATES.NOT_STARTED,
        scSynthReadyState: constants_1.READY_STATES.NOT_STARTED
    };
}
exports.create_default_state = create_default_state;
function default_1(state, action) {
    if (state === void 0) { state = create_default_state(); }
    switch (action.type) {
        case actionTypes_1.SC_STORE_INIT:
            return __assign(__assign({}, state), { scStoreReadyState: constants_1.READY_STATES.INIT });
        case actionTypes_1.SC_STORE_READY:
            return __assign(__assign({}, state), { scStoreReadyState: constants_1.READY_STATES.READY });
        case actionTypes_1.SC_LANG_INIT:
            return __assign(__assign({}, state), { scLangReadyState: constants_1.READY_STATES.INIT, scSynthReadyState: constants_1.READY_STATES.INIT });
        case actionTypes_1.SC_LANG_READY:
            return __assign(__assign({}, state), { scLangReadyState: constants_1.READY_STATES.READY });
        case actionTypes_1.SC_LANG_QUIT:
            return __assign(__assign({}, state), { scLangReadyState: constants_1.READY_STATES.NOT_STARTED });
        case actionTypes_1.SC_SYNTH_READY:
            return __assign(__assign({}, state), { scSynthReadyState: constants_1.READY_STATES.READY });
        default:
            break;
    }
    return state;
}
exports["default"] = default_1;
