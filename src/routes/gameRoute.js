import express from "express";
const route = express.Router();
import GameController from "../controllers/gameController.js"
import { verifyRole } from "../middleware/verifyRole.js";
import { userRole } from "../ultis/enum.js";
import { verifyToken } from "../middleware/auth.js";

route.get('/game', GameController.getGame);

//admin
route.post('/game', verifyToken, verifyRole(userRole.admin), GameController.createOrUpdateGame);
route.put('/game', verifyToken, verifyRole(userRole.admin), GameController.createOrUpdateGame);

export default route;