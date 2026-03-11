import * as Sentry from "@sentry/node";
import { Prisma } from "@prisma/client";

export function errorHandler(err, req, res, next) {
  try {
    Sentry.captureException(err);
  } catch (_) {
    // ignore reporting errors
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({ message: "Bad request" });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({ message: "Resource already exists" });
    }

    return res.status(400).json({ message: "Bad request" });
  }

  if (res.headersSent) {
    return next(err);
  }

  return res
    .status(500)
    .json({ message: "An error occurred on the server, please double-check your request!" });
}
