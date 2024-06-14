"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _lessonController = _interopRequireDefault(require("../controllers/lessonController.js"));
var _verifyRole = require("../middleware/verifyRole.js");
var _enum = require("../ultis/enum.js");
var _auth = require("../middleware/auth.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var route = _express["default"].Router();
route.get('/lesson', _lessonController["default"].getStudyById);
route.get('/tableOfContentLevel', _lessonController["default"].getTableOfContentLevel);
route.get('/tableOfContentStudy', _lessonController["default"].getTableOfContentStudy);

//admin
route.post('/lesson', _auth.verifyToken, (0, _verifyRole.verifyRole)(_enum.userRole.admin), _lessonController["default"].createLesson);
route.get('/allStudy', _auth.verifyToken, (0, _verifyRole.verifyRole)(_enum.userRole.admin), _lessonController["default"].getAllStudy);
route["delete"]('/lesson', _auth.verifyToken, (0, _verifyRole.verifyRole)(_enum.userRole.admin), _lessonController["default"].deleteLessonById);
route.post('/setOrderLesson', _auth.verifyToken, (0, _verifyRole.verifyRole)(_enum.userRole.admin), _lessonController["default"].setOrderLesson);
route.put('/updateLesson', _auth.verifyToken, (0, _verifyRole.verifyRole)(_enum.userRole.admin), _lessonController["default"].updateLesson);
var _default = exports["default"] = route;