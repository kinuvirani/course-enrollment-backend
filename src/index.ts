import Config from "./config";
import { sequelize } from "./models";
import express, { Express } from "express";
import cors from "cors";
import morgan from 'morgan';
import StudentRoutes from "./routes/student.routes";
import CourseRoutes from "./routes/course.routes";
import EnrollmentRoutes from "./routes/enrollment.routes";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/students", StudentRoutes);
app.use("/api/v1/courses", CourseRoutes);
app.use("/api/v1/enrollments", EnrollmentRoutes);

async function main() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false });
    } catch (err) {
        console.error("DB connection failed:", err);
    }
}

app.listen(Config.SERVER_PORT, () => {
    console.log(`Server started on port ${Config.SERVER_PORT}`);
    main();
});
