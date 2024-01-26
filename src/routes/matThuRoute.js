import express from "express";
const route = express.Router();
import MatThuController from "../controllers/matThuController.js"
import { verifyRole } from "../middleware/verifyRole.js";
import { userRole } from "../ultis/enum.js";
import { verifyToken } from "../middleware/auth.js";


route.get('/matThuByUser', verifyToken, MatThuController.getMatThuByUser);
route.post('/submitMatThu', verifyToken, MatThuController.submitMatThu);

// admin
route.post('/matThu', verifyToken, verifyRole(userRole.admin), MatThuController.createMatThu);
route.get('/matThu', verifyToken, verifyRole(userRole.admin), MatThuController.getAllMatThu);
route.get('/matThuById', verifyToken, verifyRole(userRole.admin), MatThuController.getMatThuById);
route.put('/matThu', verifyToken, verifyRole(userRole.admin), MatThuController.updateMatThu);
route.delete('/matThu', verifyToken, verifyRole(userRole.admin), MatThuController.deleteMatThu);

export default route;