import bcrypt from "bcrypt"

const salt = 6

class hashedPass {
    hash(password: string) {
        return bcrypt.hash(password, salt as number)
    };
    compare(password: string, hash: string) {
        return bcrypt.compare(password, hash)
    };
}

export const hashedHelper = new hashedPass ()