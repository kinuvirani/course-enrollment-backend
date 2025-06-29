import {StudentModel} from "../models";
import bcrypt from 'bcrypt';
import {DuplicateEmail, EmailNotExists, IncorrectPassword} from "../exceptions";
import Config from "../config";
import { encodeAccessToken } from "../utils/token";

export class StudentService {
    constructor(private readonly studentModel: typeof StudentModel) {}

    async register(data: {name: string, email: string, password: string}) {
        const {name, email, password} = data;
        const existingStudent = await this.studentModel.findOne({where: { email }});
        if (existingStudent) throw new DuplicateEmail(email);
        const passwordHash = await bcrypt.hash(password, Number(Config.PASSWORD_SALT));
        const newStudent = await this.studentModel.create({name, email, password: passwordHash})
        return newStudent;
    }

    async login(data: {email: string, password: string}) {
        const {email, password} = data;
        const existingStudent = await this.studentModel.findOne({where: {email}, attributes: ["name", "email", "password", "studentId"]});
        if (!existingStudent) throw new EmailNotExists("Email does not exists");
        const isPasswordMatch = await bcrypt.compare(password, existingStudent.password);
        if (!isPasswordMatch) throw new IncorrectPassword("Passwords don't match");
        const token = await encodeAccessToken({id: existingStudent?.studentId, email});
        return {...existingStudent.toJSON(), token};
    }
}