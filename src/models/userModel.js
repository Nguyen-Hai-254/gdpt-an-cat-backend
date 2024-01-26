import mongoose from "mongoose";
import { userRole } from "../ultis/enum";

const UserModel = new mongoose.Schema({
    email: { type: String, require: true },
    password: { type: String, require: true },
    name: { type: String, require: true },
    role: { type: String, default: userRole.user, enum: userRole },
    createAt: { type: Date, default: Date.now },
    lastLogin: { type: Date },
    matThu: { type: Number, default: 0 },
    address: { type: String }
})

module.exports = mongoose.model('User', UserModel);