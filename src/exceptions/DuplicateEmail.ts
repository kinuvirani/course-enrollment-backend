export class DuplicateEmail extends Error {
    constructor(email: string) {
        super(`Email ${email} already exists`);
        this.name = "DuplicateEmail";
    }
}