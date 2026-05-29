import { Request, Response, NextFunction } from "express";
import { AppError } from "./custom-errors";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: { code: err.errorCode, message: err.message },
    });
    return;
  }

  res.status(500).json({
    error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" },
  });
}
