"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var StoryModel = new _mongoose["default"].Schema({
  name: {
    type: String,
    require: true
  },
  link: {
    type: String,
    require: true
  },
  content: {
    type: String
  },
  image: {
    type: String,
    require: true
  },
  createAt: {
    type: Date,
    "default": Date.now
  }
});
module.exports = _mongoose["default"].model('Story', StoryModel);