import express from "express";
const route = express.Router();

import lessonRoute from "./lessonRoute.js";
import accountRoute from "./accountRoute.js";
import gameRoute from "./gameRoute.js";
import matThuRoute from "./matThuRoute.js";
import storyRoute from "./storyRoute.js";

route.use('/', lessonRoute);
route.use('/', accountRoute);
route.use('/', gameRoute);
route.use('/', matThuRoute);
route.use('/', storyRoute);

module.exports = route;