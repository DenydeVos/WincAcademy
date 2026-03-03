import "dotenv/config";
import express from "express";
import * as Sentry from "@sentry/node";

import { requestDurationLogger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";

import { loginRouter } from "./routes/login.js";
import { usersRouter } from "./routes/users.js";
import { hostsRouter } from "./routes/hosts.js";
import { propertiesRouter } from "./routes/properties.js";
import { bookingsRouter } from "./routes/bookings.js";
import { reviewsRouter } from "./routes/reviews.js";

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN || "",
  tracesSampleRate: 0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(express.json());
app.use(requestDurationLogger);

app.get("/", (req, res) => {
  res.status(200).send("Bookings API");
});

app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/reviews", reviewsRouter);

app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
