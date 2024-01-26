import express from "express";
import AccountController from "../controllers/accountController";
import { verifyToken } from "../middleware/auth";
const route = express.Router();


route.post('/signup', AccountController.signup);
route.post('/login', AccountController.login);
route.get('/profile', verifyToken, AccountController.getProfile);
route.put('/profile', verifyToken, AccountController.updateProfile);


export default route;