require('dotenv').config()
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/connectDB";
import routes from "./routes/index.js";


let app = express();
app.use(cors({ credentials: true, origin: true }));


// app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

connectDB();
app.use('/', routes);
app.use("*", (req, res) => {
    return res.status(404).json({
        success: false,
        message: "Invalid route"
    })
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Backend NodeJS is running on the port:`, port);
});