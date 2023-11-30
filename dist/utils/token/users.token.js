import jwt from "jsonwebtoken";
class JsonWebtoken {
    sign(pyload) {
        return jwt.sign(pyload, process.env.KEY);
    }
    ;
    verify(token) {
        try {
            return jwt.verify(token, process.env.KEY);
        }
        catch (error) {
            console.error(error.message);
            process.exit(-1);
        }
    }
}
export const JwtHelper = new JsonWebtoken();
