"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
var _enum = require("../ultis/enum");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var UserModel = new _mongoose["default"].Schema({
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  role: {
    type: String,
    "default": _enum.userRole.user,
    "enum": _enum.userRole
  },
  createAt: {
    type: Date,
    "default": Date.now
  },
  lastLogin: {
    type: Date
  },
  matThu: {
    type: Number,
    "default": 0
  },
  address: {
    type: String
  }
});
module.exports = _mongoose["default"].model('User', UserModel);