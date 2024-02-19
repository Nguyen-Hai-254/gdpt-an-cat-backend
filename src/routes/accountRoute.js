import express from "express";
import AccountController from "../controllers/accountController";
import { verifyToken } from "../middleware/auth";
import { verifyRole } from "../middleware/verifyRole";
import { userRole } from "../ultis/enum";
const route = express.Router();


route.post('/signup', AccountController.signup);
route.post('/login', AccountController.login);
route.get('/profile', verifyToken, AccountController.getProfile);
route.put('/profile', verifyToken, AccountController.updateProfile);

// admin
route.get('/getAllUser', verifyToken, verifyRole(userRole.admin), AccountController.getAllUser);



export default route;