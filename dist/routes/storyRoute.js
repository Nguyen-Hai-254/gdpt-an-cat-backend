"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _verifyRole = require("../middleware/verifyRole.js");
var _enum = require("../ultis/enum.js");
var _auth = require("../middleware/auth.js");
var _storyController = _interopRequireDefault(require("../controllers/storyController.js"));
var _upload = _interopRequireDefault(require("../middleware/upload.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var route = _express["default"].Router();
route.get('/story-limited', _storyController["default"].getStoryLimited);
route.get('/story', _storyController["default"].getAllStory);
route.get('/story-link', _storyController["default"].getStoryByLink);

//admin
route.post('/story', _auth.verifyToken, (0, _verifyRole.verifyRole)(_enum.userRole.admin), _storyController["default"].createStory);
route.get('/story-id', _auth.verifyToken, (0, _verifyRole.verifyRole)(_enum.userRole.admin), _storyController["default"].getStoryById);
route["delete"]('/story', _auth.verifyToken, (0, _verifyRole.verifyRole)(_enum.userRole.admin), _storyController["default"].deleteStory);
// route.post('/setOrderLesson', verifyToken, verifyRole(userRole.admin), LessonController.setOrderLesson);
route.put('/story', _auth.verifyToken, (0, _verifyRole.verifyRole)(_enum.userRole.admin), _storyController["default"].updateStory);
var _default = exports["default"] = route;