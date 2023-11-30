import jwt from "jsonwebtoken"

class JsonWebtoken {
    sign(pyload: string | object): string {
        return jwt.sign(pyload, process.env.KEY as string);
    } ;
    verify(token: string) {
        try {
            return jwt.verify(token, process.env.KEY as string)
        } catch (error: any) {
            console.error(error.message);
            process.exit(-1)
        }
    }
}

export const JwtHelper = new JsonWebtoken()