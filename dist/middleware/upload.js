"use strict";

var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, __dirname + "../../resources/");
  },
  filename: function filename(req, file, cb) {
    var uniqueSuffix = Date.now();
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});
var upload = (0, _multer["default"])({
  storage: storage
});
module.exports = upload;