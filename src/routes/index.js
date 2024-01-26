import express from "express";
const route = express.Router();

import lessonRoute from "./lessonRoute.js";
import accountRoute from "./accountRoute.js";
import gameRoute from "./gameRoute.js";
import matThuRoute from "./matThuRoute.js";

route.use('/', lessonRoute);
route.use('/', accountRoute);
route.use('/', gameRoute);
route.use('/', matThuRoute);

module.exports = route;