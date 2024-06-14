"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _gameController = _interopRequireDefault(require("../controllers/gameController.js"));
var _verifyRole = require("../middleware/verifyRole.js");
var _enum = require("../ultis/enum.js");
var _auth = require("../middleware/auth.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var route = _express["default"].Router();
route.get('/game', _gameController["default"].getGame);

//admin
route.post('/game', _auth.verifyToken, (0, _verifyRole.verifyRole)(_enum.userRole.admin), _gameController["default"].createOrUpdateGame);
route.put('/game', _auth.verifyToken, (0, _verifyRole.verifyRole)(_enum.userRole.admin), _gameController["default"].createOrUpdateGame);
var _default = exports["default"] = route;