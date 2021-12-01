import express from "express";

import { NotFoundError } from "./expressError";
import gameRoutes from "./routes/game";
import morgan from "morgan";
import { PORT } from "./config";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use("/game", gameRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err: any, req:any, res:any, next:any) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(PORT, function () {
  console.log(`Started on ${PORT}`);
});

