import { Router } from "express";
const route = Router();

import { validate } from "../middlewares/validate";
import { registerSchema, loginSchema } from "../validators";
import {loginStudent, registerStudent} from "../controllers/student.controller";

route.post("/register", validate(registerSchema), registerStudent);

route.post("/login", validate(loginSchema), loginStudent);

export default route;