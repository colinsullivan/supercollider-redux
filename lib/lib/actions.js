"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supercolliderReady = supercolliderReady;
exports.supercolliderInitStarted = supercolliderInitStarted;

var actionTypes = _interopRequireWildcard(require("./actionTypes"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 *  @file       actions.js
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/
function supercolliderReady() {
  return {
    type: actionTypes.SUPERCOLLIDER_READY
  };
}

function supercolliderInitStarted() {
  return {
    type: actionTypes.SUPERCOLLIDER_INIT_START
  };
}