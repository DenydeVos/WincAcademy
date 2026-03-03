import jwt from "jsonwebtoken";

export function authRequired(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // The provided Postman tests store the raw token in {{bearerToken}} and send it
  // as the Authorization header value (without the 'Bearer ' prefix).
  // Accept both formats:
  //   Authorization: <token>
  //   Authorization: Bearer <token>
  const token = header.startsWith("Bearer ") ? header.slice("Bearer ".length) : header;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(token, process.env.AUTH_SECRET_KEY);
    req.user = payload;
    return next();
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
