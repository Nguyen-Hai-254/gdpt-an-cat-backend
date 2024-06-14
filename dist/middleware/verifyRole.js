"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyRole = void 0;
var verifyRole = exports.verifyRole = function verifyRole() {
  for (var _len = arguments.length, allowedRoles = new Array(_len), _key = 0; _key < _len; _key++) {
    allowedRoles[_key] = arguments[_key];
  }
  return function (req, res, next) {
    if (!(req !== null && req !== void 0 && req.user)) {
      return res.status(401).json('Token is valid');
    }
    var rolesArray = [].concat(allowedRoles);
    var result = rolesArray.includes(req.user.role);
    if (!result) {
      return res.status(403).json('You are not authorized to do this');
    }
    next();
  };
};