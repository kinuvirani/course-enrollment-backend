import { z } from "zod";

export const enrollmentSchema = z.object({
    studentId: z.number().nonnegative("Invalid studentId"),
    courseId: z.number().nonnegative("Invalid courseId"),
})
