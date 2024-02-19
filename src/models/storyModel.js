import mongoose from "mongoose";

const StoryModel = new mongoose.Schema({
    name: { type: String, require: true },
    link: { type: String, require: true },
    content: { type: String },
    image: { type: String, require: true },
    createAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Story', StoryModel);