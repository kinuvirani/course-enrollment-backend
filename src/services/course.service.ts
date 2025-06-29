import {CourseModel} from "../models";

export class CourseService {
    constructor(private readonly courseModel: typeof CourseModel) {}

    async getAllCourses(query: any) {
        let filter: any = {
            attributes: ["courseId", "name", "isAvailable"]
        }

        if (query && Object.keys(query).length > 0) {
            const where: any = { ...query };

            if (where.isAvailable !== undefined) {
                where.isAvailable = where.isAvailable === 'true';
            }

            filter = { ...filter, where };
        }
        return await this.courseModel.findAll(filter);
    }
}