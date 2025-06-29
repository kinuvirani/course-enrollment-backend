import {DataTypes, HasManyGetAssociationsMixin, Model, Optional, Sequelize} from "sequelize";
import {CourseEnrollmentModel} from "./courseenrollment.model";

interface StudentAttributes {
    studentId: number;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface StudentCreationAttributes extends Optional<StudentAttributes, "studentId"> {}

export class StudentModel extends Model<StudentAttributes, StudentCreationAttributes> implements StudentAttributes {
    public studentId!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getEnrolledCourses!: HasManyGetAssociationsMixin<CourseEnrollmentModel>;

    static initModel(sequelize: Sequelize): typeof StudentModel {
        StudentModel.init(
            {
                studentId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            }, {
                sequelize,
                tableName: "students",
                timestamps: true,
                underscored: true
            }
        )
        return StudentModel;
    }

    static associate(models: any) {
        StudentModel.hasMany(models.CourseEnrollmentModel, {
            foreignKey: "student_id",
            as: "studentEnrollments",
        })
    }
}
