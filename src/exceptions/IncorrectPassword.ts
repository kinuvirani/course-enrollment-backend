export class IncorrectPassword extends Error {
    constructor(message: string) {
        super(message);
        this.name = "IncorrectPassword";
    }
}