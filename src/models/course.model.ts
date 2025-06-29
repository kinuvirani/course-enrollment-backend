import {DataTypes, HasManyGetAssociationsMixin, Model, Optional, Sequelize} from "sequelize";
import {CourseEnrollmentModel} from "./courseenrollment.model";

interface CourseAttributes {
    courseId: number;
    name: string;
    isAvailable: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface CourseCreationAttributes extends Optional<CourseAttributes, "courseId"> {}

export class CourseModel extends Model<CourseAttributes, CourseCreationAttributes> implements CourseAttributes {
    public courseId!: number;
    public name!: string;
    public isAvailable!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getEnrolledStudents!: HasManyGetAssociationsMixin<CourseEnrollmentModel>;

    static initModel(sequelize: Sequelize): typeof CourseModel{
        CourseModel.init({
            courseId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isAvailable: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'courses',
            timestamps: true,
            underscored: true
        })
        return CourseModel;
    }

    static associate(models: any) {
        CourseModel.hasMany(models.CourseEnrollmentModel, {
            foreignKey: "course_id",
            as: "courseEnrollments",
        })
    }
}