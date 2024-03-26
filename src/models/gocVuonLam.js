import mongoose from "mongoose";

const DocsModel = new mongoose.Schema({
    content: { type: String },
    image: { type: String },
})

const GocVuonLamModel = new mongoose.Schema({
    title: { type: String, require: true },
    url: { type: String, require: true },
    order: { type: Number },
    content: [DocsModel],
    createAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('GocVuonLam', GocVuonLamModel);