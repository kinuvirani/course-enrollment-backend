import { CourseService } from "../services/course.service";
import {CourseModel} from '../models';
import {Request, Response, NextFunction} from "express";

const courseService = new CourseService(CourseModel);

export const getAllCourses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const courses = await courseService.getAllCourses(req.query);
        res.status(200).json({message: "Courses fetched successfully", data: courses});
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
}