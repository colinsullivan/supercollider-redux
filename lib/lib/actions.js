"use strict";
/**
 *  @file       actions.js
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/
exports.__esModule = true;
exports.scLangQuit = exports.scLangReady = exports.scLangInit = exports.scStoreInit = exports.scStoreReady = void 0;
var actionTypes_1 = require("./actionTypes");
function scStoreReady() {
    return {
        type: actionTypes_1.SC_STORE_READY
    };
}
exports.scStoreReady = scStoreReady;
function scStoreInit() {
    return {
        type: actionTypes_1.SC_STORE_INIT
    };
}
exports.scStoreInit = scStoreInit;
function scLangInit() {
    return {
        type: actionTypes_1.SC_LANG_INIT
    };
}
exports.scLangInit = scLangInit;
function scLangReady() {
    return {
        type: actionTypes_1.SC_LANG_READY
    };
}
exports.scLangReady = scLangReady;
function scLangQuit() {
    return {
        type: actionTypes_1.SC_LANG_QUIT
    };
}
exports.scLangQuit = scLangQuit;
