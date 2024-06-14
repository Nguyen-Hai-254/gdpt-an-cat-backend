"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkTypeLevel = exports.checkTypeLesson = exports.checkTypeChapter = void 0;
var _enum = require("./enum");
var checkTypeLesson = exports.checkTypeLesson = function checkTypeLesson(type) {
  var isExist = _enum.typeLesson.filter(function (typeLesson) {
    return typeLesson === type;
  });
  return isExist ? true : false;
};
var checkTypeLevel = exports.checkTypeLevel = function checkTypeLevel(type) {
  var isExist = _enum.typeLevel.filter(function (typeLevel) {
    return typeLevel === type;
  });
  return isExist ? true : false;
};
var checkTypeChapter = exports.checkTypeChapter = function checkTypeChapter(type) {
  var isExist = _enum.typeChapter.filter(function (typeChapter) {
    return typeChapter === type;
  });
  return isExist ? true : false;
};