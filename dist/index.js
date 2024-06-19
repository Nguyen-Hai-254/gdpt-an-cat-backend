"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _connectDB = require("./config/connectDB");
var _index = _interopRequireDefault(require("./routes/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
require('dotenv').config();

// import  connectDB  from "./config/connectDB.js";

var app = (0, _express["default"])();
app.use((0, _cors["default"])({
  credentials: true,
  origin: true
}));

// const corsOptions = {
//     origin: 'https://gdpt-ancat.netlify.app',
//     credentials: true,
//     optionSuccessStatus: 200
// }

// app.use(cors(corsOptions));
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', "https://gdpt-ancat.netlify.app");
//     res.header('Access-Control-Allow-Headers', true);
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     next();
// });

// app.use(cookieParser());
app.use(_bodyParser["default"].json({
  limit: '50mb'
}));
app.use(_bodyParser["default"].urlencoded({
  limit: '50mb',
  extended: true
}));

// connectDB;
(0, _connectDB.connectDB)();
app.use('/', _index["default"]);
app.use("*", function (req, res) {
  return res.status(404).json({
    success: false,
    message: "Invalid route"
  });
});
var port = process.env.PORT || 3002;
app.listen(port, function () {
  console.log("Backend NodeJS is running on the port:", port);
});