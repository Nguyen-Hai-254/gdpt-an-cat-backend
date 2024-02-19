require('dotenv').config()
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/connectDB";
import routes from "./routes/index.js";


let app = express();
// app.use(cors({ credentials: true, origin: true }));

const corsOptions = {
    origin: 'https://gdpt-ancat.netlify.app',
    credentials: true,
    optionSuccessStatus: 200
}


app.use(cors(corsOptions));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "https://gdpt-ancat.netlify.app");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});





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