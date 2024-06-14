"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var GameModel = new _mongoose["default"].Schema({
  content: {
    type: String
  }
});
module.exports = _mongoose["default"].model('Game', GameModel);