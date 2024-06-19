"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
var _enum = require("../ultis/enum");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var DocsModel = new _mongoose["default"].Schema({
  content: {
    type: String
  },
  image: {
    type: String
  }
});
var LessonModel = new _mongoose["default"].Schema({
  title: {
    type: String,
    require: true
  },
  url: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true,
    "enum": _enum.typeLesson
  },
  level: {
    type: String,
    require: true,
    "enum": _enum.typeLevel
  },
  chapter: {
    type: String,
    require: require,
    "enum": _enum.typeChapter
  },
  order: {
    type: Number
  },
  // content: { type: String }
  lesson: [DocsModel]
});
module.exports = _mongoose["default"].model('Lesson', LessonModel);