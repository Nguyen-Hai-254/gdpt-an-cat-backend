import mongoose from "mongoose";
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_SERVER, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            ssl: true,
            dbName: process.env.MONGODB_DATABASE_NAME
        })
        console.log('Connect database Successful !!');
    } catch (e) {
        console.log('Connect Failed !!', e);
    }
}

module.exports = { connectDB }