import * as Sentry from "@sentry/node";
import { Prisma } from "@prisma/client";

export function errorHandler(err, req, res, next) {
  // report
  try {
    Sentry.captureException(err);
  } catch (_) {
    // ignore
  }

  // Prisma validation / known request errors should be treated as bad request
  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({ message: "Bad request" });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // e.g. unique constraint, missing relation
    return res.status(400).json({ message: "Bad request" });
  }

  // If the route already set a status (rare), honor it
  if (res.headersSent) {
    return next(err);
  }

  return res
    .status(500)
    .json({ message: "An error occurred on the server, please double-check your request!" });
}
