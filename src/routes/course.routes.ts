import {Router} from "express";
const route = Router();

import {authenticate} from '../middlewares/auth';
import {getAllCourses} from "../controllers/course.controller";

route.get("/", authenticate, getAllCourses);

export default route;