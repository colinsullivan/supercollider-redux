"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supercolliderReady = supercolliderReady;
exports.supercolliderInitStarted = supercolliderInitStarted;

var _actionTypes = require("./actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function supercolliderReady() {
  return {
    type: actionTypes.SUPERCOLLIDER_READY
  };
} /**
   *  @file       actions.js
   *
   *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
   *
   *  @copyright  2017 Colin Sullivan
   *  @license    Licensed under the MIT license.
   **/

function supercolliderInitStarted() {
  return {
    type: actionTypes.SUPERCOLLIDER_INIT_START
  };
}