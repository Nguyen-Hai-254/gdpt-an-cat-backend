import express from "express";
const route = express.Router();

import lessonRoute from "./lessonRoute.js";
import accountRoute from "./accountRoute.js";

route.use('/', lessonRoute);
route.use('/', accountRoute);

module.exports = route;