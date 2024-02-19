import express from "express";
const route = express.Router();
import { verifyRole } from "../middleware/verifyRole.js";
import { userRole } from "../ultis/enum.js";
import { verifyToken } from "../middleware/auth.js";
import StoryController from "../controllers/storyController.js";
import upload from "../middleware/upload.js"


route.get('/story-limited', StoryController.getStoryLimited);
route.get('/story', StoryController.getAllStory);
route.get('/story-link', StoryController.getStoryByLink);


//admin
route.post('/story', verifyToken, verifyRole(userRole.admin), StoryController.createStory);
route.get('/story-id', verifyToken, verifyRole(userRole.admin), StoryController.getStoryById);
route.delete('/story', verifyToken, verifyRole(userRole.admin), StoryController.deleteStory);
// route.post('/setOrderLesson', verifyToken, verifyRole(userRole.admin), LessonController.setOrderLesson);
route.put('/story', verifyToken, verifyRole(userRole.admin), StoryController.updateStory);

export default route;