export class EmailNotExists extends Error {
    constructor(message: string) {
        super(message);
        this.name = "EmailNotExists";
    }
}