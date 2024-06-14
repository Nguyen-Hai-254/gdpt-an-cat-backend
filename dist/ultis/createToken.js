"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
require('dotenv').config();
var createToken = exports.createToken = function createToken(payload) {
  var key = process.env.JWT_PRIVATEKEY;
  var token = null;
  try {
    token = _jsonwebtoken["default"].sign(payload, key);
  } catch (e) {
    console.log(e);
  }
  return token;
};