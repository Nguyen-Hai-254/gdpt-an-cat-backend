"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _matThuController = _interopRequireDefault(require("../controllers/matThuController.js"));
var _verifyRole = require("../middleware/verifyRole.js");
var _enum = require("../ultis/enum.js");
var _auth = require("../middleware/auth.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var route = _express["default"].Router();
route.get('/matThuByUser', _auth.verifyToken, _matThuController["default"].getMatThuByUser);
route.post('/submitMatThu', _auth.verifyToken, _matThuController["default"].submitMatThu);

// admin
route.post('/matThu', _auth.verifyToken, (0, _verifyRole.verifyRole)(_enum.userRole.admin), _matThuController["default"].createMatThu);
route.get('/matThu', _auth.verifyToken, (0, _verifyRole.verifyRole)(_enum.userRole.admin), _matThuController["default"].getAllMatThu);
route.get('/matThuById', _auth.verifyToken, (0, _verifyRole.verifyRole)(_enum.userRole.admin), _matThuController["default"].getMatThuById);
route.put('/matThu', _auth.verifyToken, (0, _verifyRole.verifyRole)(_enum.userRole.admin), _matThuController["default"].updateMatThu);
route["delete"]('/matThu', _auth.verifyToken, (0, _verifyRole.verifyRole)(_enum.userRole.admin), _matThuController["default"].deleteMatThu);
var _default = exports["default"] = route;