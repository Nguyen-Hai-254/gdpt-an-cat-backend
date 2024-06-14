"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var DocsModel = new _mongoose["default"].Schema({
  content: {
    type: String
  },
  image: {
    type: String
  }
});
var GocVuonLamModel = new _mongoose["default"].Schema({
  title: {
    type: String,
    require: true
  },
  url: {
    type: String,
    require: true
  },
  order: {
    type: Number
  },
  content: [DocsModel],
  createAt: {
    type: Date,
    "default": Date.now
  }
});
module.exports = _mongoose["default"].model('GocVuonLam', GocVuonLamModel);