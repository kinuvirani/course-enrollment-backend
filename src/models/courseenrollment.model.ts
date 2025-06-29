import { CourseStatus } from "../enums";
import {BelongsToGetAssociationMixin, DataTypes, Model, Optional, Sequelize} from "sequelize";
import { StudentModel } from "./student.model";
import {CourseModel} from "./course.model";

interface CourseEnrollmentAttributes {
    enrollmentId: number;
    studentId: number;
    courseId: number;
    status: CourseStatus,
    grade: number,
    createdAt?: Date;
    updatedAt?: Date;
}

interface CourseEnrollmentCreationAttributes extends Optional<CourseEnrollmentAttributes, "enrollmentId"> {}

export class CourseEnrollmentModel extends Model<CourseEnrollmentAttributes, CourseEnrollmentCreationAttributes> implements CourseEnrollmentAttributes {
    public enrollmentId!: number;
    public studentId!: number;
    public courseId!: number;
    public status!: CourseStatus;
    public grade!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getStudent!: BelongsToGetAssociationMixin<StudentModel>;
    public getCourse!: BelongsToGetAssociationMixin<CourseModel>;

    static initModel(sequelize: Sequelize): typeof CourseEnrollmentModel {
        CourseEnrollmentModel.init({
            enrollmentId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            studentId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            courseId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM("IN_PROGRESS", "DONE"),
                defaultValue: CourseStatus.IN_PROGRESS
            },
            grade: {
                type: DataTypes.DOUBLE,
                defaultValue: 0
            }
        }, {
            sequelize,
            tableName: "courseEnrollment",
            timestamps: true,
            underscored: true
        })
        return CourseEnrollmentModel;
    }

    static associate(models: any) {
        CourseEnrollmentModel.belongsTo(models.StudentModel, {
            foreignKey: "student_id",
            as: "student"
        });

        CourseEnrollmentModel.belongsTo(models.CourseModel, {
            foreignKey: "course_id",
            as: "course"
        });
    }
}