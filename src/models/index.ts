import { Sequelize } from 'sequelize';
import Config from "../config/index";
import {StudentModel} from "./student.model";
import {CourseModel} from "./course.model";
import { CourseEnrollmentModel } from "./courseenrollment.model";

const sequelize = new Sequelize(Config.DATABASE_NAME, Config.DATABASE_USERNAME, Config.DATABASE_PASSWORD, {
    host: Config.DATABASE_HOST,
    dialect: 'postgres',
});

const models = {
    StudentModel,
    CourseModel,
    CourseEnrollmentModel,
}

Object.values(models).forEach((model: any) => {
    if (model.initModel) {
        model.initModel(sequelize);
    }
});

Object.values(models).forEach((model: any) => {
    if (model.associate) {
        model.associate(models)
    }
})

export {
    sequelize,
    StudentModel,
    CourseModel,
    CourseEnrollmentModel
}

