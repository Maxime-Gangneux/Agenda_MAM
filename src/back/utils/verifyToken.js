import jwt from "jsonwebtoken";

const SECRET_KEY = "ton_secret";

export function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}
