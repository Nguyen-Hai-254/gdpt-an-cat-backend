import mongoose from "mongoose";

const GameModel = new mongoose.Schema({
    content: { type: String }
})

module.exports = mongoose.model('Game', GameModel);