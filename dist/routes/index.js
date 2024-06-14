"use strict";

var _express = _interopRequireDefault(require("express"));
var _lessonRoute = _interopRequireDefault(require("./lessonRoute.js"));
var _accountRoute = _interopRequireDefault(require("./accountRoute.js"));
var _gameRoute = _interopRequireDefault(require("./gameRoute.js"));
var _matThuRoute = _interopRequireDefault(require("./matThuRoute.js"));
var _storyRoute = _interopRequireDefault(require("./storyRoute.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var route = _express["default"].Router();
route.use('/', _lessonRoute["default"]);
route.use('/', _accountRoute["default"]);
route.use('/', _gameRoute["default"]);
route.use('/', _matThuRoute["default"]);
route.use('/', _storyRoute["default"]);
module.exports = route;