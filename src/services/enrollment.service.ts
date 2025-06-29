import {CourseEnrollmentModel, CourseModel, StudentModel} from "../models";
import { omit } from "lodash";
import {EnrollmentNotFound} from "../exceptions/EnrollmentNotFound";

export class EnrollmentService {
    constructor(private readonly enrollmentModel: typeof CourseEnrollmentModel) {}

    async createEnrollment(data: CourseEnrollmentModel) {
        const enrollment = await this.enrollmentModel.create({
            ...data
        });
        return omit(enrollment.toJSON(), ["createdAt", "updatedAt"]);
    }

    async getEnrollments(data: any) {
        let filter: any = {
            attributes: ["studentId", "courseId", "enrollmentId", "grade", "status"],
            include: [
                {model: StudentModel, as: "student"},
                {model: CourseModel, as: "course"},
            ]
        }
        filter = data ? {...filter, where: data} : filter;
        return await this.enrollmentModel.findAll(filter)
    }

    async updateEnrollment(data: any, enrollmentId: number | string) {
        const existingEnrollment = await this.enrollmentModel.findByPk(enrollmentId);
        if (!existingEnrollment) {
            throw new EnrollmentNotFound("Enrollment not found");
        }
        await this.enrollmentModel.update(data, {where: { enrollmentId }});
        return await this.enrollmentModel.findByPk(enrollmentId, {attributes: ["studentId", "enrollmentId", "grade", "status"]});
    }

    async getEnrollment(enrollmentId: number | string) {
        const existingEnrollment = await this.enrollmentModel.findByPk(enrollmentId);
        if (!existingEnrollment) {
            throw new EnrollmentNotFound("Enrollment not found");
        }

        const student = await existingEnrollment.getStudent();
        const course = await existingEnrollment.getCourse();
        return {...existingEnrollment.toJSON(), student: student.toJSON(), course: course.toJSON()};
    }

    async deleteEnrollment(enrollmentId: string) {
        const existingEnrollment = await this.enrollmentModel.findByPk(enrollmentId, {attributes: ["studentId", "enrollmentId", "grade", "status"]});
        if (!existingEnrollment) {
            throw new EnrollmentNotFound("Enrollment not found");
        }
        return await this.enrollmentModel.destroy({where: {enrollmentId}});
    }
}