import mongoose from "mongoose";

const MatThuModel = new mongoose.Schema({
    OTT: { type: String, require: true },
    OTTIsImage: { type: Boolean, default: false },
    NW: { type: String, require: true },
    NWIsImage: { type: Boolean, default: false },
    BV: { type: String, require: true },
    key: [{ type: String }],
    STT: { type: Number },
    userCount: { type: Number, default: 0 }
})

module.exports = mongoose.model('MatThu', MatThuModel);