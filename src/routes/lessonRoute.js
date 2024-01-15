import express from "express";
const route = express.Router();
import LessonController from "../controllers/lessonController.js"
import { verifyRole } from "../middleware/verifyRole.js";
import { userRole } from "../ultis/enum.js";
import { verifyToken } from "../middleware/auth.js";

route.get('/lesson', LessonController.getStudyById);

route.get('/tableOfContentLevel', LessonController.getTableOfContentLevel);
route.get('/tableOfContentStudy', LessonController.getTableOfContentStudy);


//admin
route.post('/lesson', verifyToken, verifyRole(userRole.admin), LessonController.createLesson);
route.get('/allStudy', verifyToken, verifyRole(userRole.admin), LessonController.getAllStudy);
route.delete('/lesson', verifyToken, verifyRole(userRole.admin), LessonController.deleteLessonById);
route.post('/setOrderLesson', verifyToken, verifyRole(userRole.admin), LessonController.setOrderLesson);
route.put('/updateLesson', verifyToken, verifyRole(userRole.admin), LessonController.updateLesson);

export default route;