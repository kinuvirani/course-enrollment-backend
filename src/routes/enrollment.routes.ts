import {Router} from "express";
import {authenticate} from "../middlewares/auth";
import {
    createEnrollment,
    deleteEnrollment,
    getEnrollment,
    getEnrollments,
    updateEnrollment
} from "../controllers/enrollment.controller";
import {validate} from "../middlewares/validate";
import {enrollmentSchema} from "../validators";

const route = Router();

route.post("/", [validate(enrollmentSchema), authenticate], createEnrollment);
route.get("/", authenticate, getEnrollments);
route.put("/:enrollmentId", authenticate, updateEnrollment);
route.get("/:enrollmentId", authenticate, getEnrollment);
route.delete("/:enrollmentId", authenticate, deleteEnrollment);

export default route;