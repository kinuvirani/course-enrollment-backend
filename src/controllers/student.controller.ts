import {NextFunction, Request, Response} from "express";
import { StudentService } from "../services/student.service";
import {StudentModel} from "../models";
import {DuplicateEmail, EmailNotExists, IncorrectPassword} from "../exceptions";

const studentService = new StudentService(StudentModel);
export const registerStudent = async (req: Request, res: Response,  next: NextFunction): Promise<void> => {
    try {
        const student = await studentService.register(req.body);
        res.status(201).json({message: "Student registered successfully", data: student});
    } catch (error) {
        if (error instanceof DuplicateEmail) {
            res.status(400).json({error: error.message})
        } else {
            res.status(500).json({error: "Internal Server Error"});
        }
    }
}

export const loginStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authenticatedStudent = await studentService.login(req.body);
        res.status(200).json({message: "Student logged in successfully", data: authenticatedStudent});
    } catch (error) {
        if (error instanceof EmailNotExists || error instanceof IncorrectPassword) {
            res.status(400).json({error: error.message})
        } else {
            res.status(500).json({error: "Internal Server Error"});
        }
    }
}