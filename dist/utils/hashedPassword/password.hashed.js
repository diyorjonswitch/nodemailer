import bcrypt from "bcrypt";
const salt = 6;
class hashedPass {
    hash(password) {
        return bcrypt.hash(password, salt);
    }
    ;
    compare(password, hash) {
        return bcrypt.compare(password, hash);
    }
    ;
}
export const hashedHelper = new hashedPass();
