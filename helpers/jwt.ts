// helpers/jwt.ts
import jwt from "jsonwebtoken";

console.log("JWT_SECRET is", process.env.JWT_SECRET);

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_here";

export function signJwt(payload: object) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}
