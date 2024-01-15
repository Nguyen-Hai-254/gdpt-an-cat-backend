import mongoose from "mongoose";
import { typeChapter, typeLesson, typeLevel } from "../ultis/enum";

const LessonModel = new mongoose.Schema({
    title: { type: String, require: true },
    url: { type: String, require: true },
    type: { type: String, require: true, enum: typeLesson },
    level: { type: String, require: true, enum: typeLevel },
    chapter: { type: String, require, enum: typeChapter },
    order: { type: Number },
    content: { type: String }
})

module.exports = mongoose.model('Lesson', LessonModel);