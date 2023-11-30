var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { JwtHelper } from "../utils/token/users.token.js";
import { hashedHelper } from "../utils/hashedPassword/password.hashed.js";
import { users } from "../models/users.models.js";
export const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield users.findOne({ username });
        if (!user) {
            res.status(403).json({ SECCES: 'user is not fount' });
            return;
        }
        const createToken = {
            username,
            isAdmin: false
        };
        const userpass = user === null || user === void 0 ? void 0 : user.password;
        const token = JwtHelper.sign(createToken);
        const passworhash = yield hashedHelper.compare(password, userpass);
        const data = {
            username,
            passworhash,
            token,
            SECCES: "login"
        };
        res.status(201).json(data);
    }
    catch (error) {
        console.error(error.message);
        process.exit(-1);
    }
});
