"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var MatThuModel = new _mongoose["default"].Schema({
  OTT: {
    type: String,
    require: true
  },
  OTTIsImage: {
    type: Boolean,
    "default": false
  },
  NW: {
    type: String,
    require: true
  },
  NWIsImage: {
    type: Boolean,
    "default": false
  },
  BV: {
    type: String,
    require: true
  },
  key: [{
    type: String
  }],
  STT: {
    type: Number
  },
  userCount: {
    type: Number,
    "default": 0
  }
});
module.exports = _mongoose["default"].model('MatThu', MatThuModel);