import {Request, Response, NextFunction} from "express";
import {EnrollmentService} from "../services/enrollment.service";
import {CourseEnrollmentModel} from "../models";
import {EnrollmentNotFound} from "../exceptions/EnrollmentNotFound";

const enrollmentService = new EnrollmentService(CourseEnrollmentModel);

export const createEnrollment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const enrollment = await enrollmentService.createEnrollment(req.body);
        res.status(201).json({message: "Student enrolled successfully.", data: enrollment});
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const getEnrollments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const enrollments = await enrollmentService.getEnrollments(req.query);
        const status = enrollments.length > 0 ? 200 : 204;
        res.status(status).json({message: "Enrollments fetched successfully.", data: enrollments})
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const updateEnrollment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const enrollment = await enrollmentService.updateEnrollment(req.body, req.params.enrollmentId);
        res.status(200).json({message: "Enrollment updated successfully.", data: enrollment});
    } catch (error) {
        if (error instanceof EnrollmentNotFound) {
            res.status(404).json({error: error.message});
        } else {
            res.status(500).json({error: "Internal Server Error"});
        }
    }
}

export const getEnrollment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const enrollment = await enrollmentService.getEnrollment(req.params.enrollmentId);
        res.status(200).json({message: "Enrollment fetched successfully.", data: enrollment});
    } catch (error) {
        if (error instanceof EnrollmentNotFound) {
            res.status(404).json({error: error.message});
        } else {
            res.status(500).json({error: "Internal Server Error"});
        }
    }
}

export const deleteEnrollment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await enrollmentService.deleteEnrollment(req.params.enrollmentId);
        res.status(200).json({message: "Enrollment withdrawn successfully."});
    } catch (error) {
        if (error instanceof EnrollmentNotFound) {
            res.status(404).json({error: error.message});
        } else {
            res.status(500).json({error: "Internal Server Error"});
        }
    }
}
