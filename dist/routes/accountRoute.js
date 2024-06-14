"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _accountController = _interopRequireDefault(require("../controllers/accountController"));
var _auth = require("../middleware/auth");
var _verifyRole = require("../middleware/verifyRole");
var _enum = require("../ultis/enum");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var route = _express["default"].Router();
route.post('/signup', _accountController["default"].signup);
route.post('/login', _accountController["default"].login);
route.get('/profile', _auth.verifyToken, _accountController["default"].getProfile);
route.put('/profile', _auth.verifyToken, _accountController["default"].updateProfile);

// admin
route.get('/getAllUser', _auth.verifyToken, (0, _verifyRole.verifyRole)(_enum.userRole.admin), _accountController["default"].getAllUser);
var _default = exports["default"] = route;