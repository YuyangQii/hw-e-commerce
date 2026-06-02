import { Request, Response, NextFunction } from "express";
import { AppError } from "./custom-errors";
import { ErrorCode } from "./error-codes";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    if (err.errorCode === ErrorCode.BAD_REQUEST) {
      try {
        const details = JSON.parse(err.message);
        res.status(400).json({
          error: {
            code: err.errorCode,
            message: "Invalid request data",
            details,
          },
        });
        return;
      } catch {
      }
    }

    res.status(err.statusCode).json({
      error: { code: err.errorCode, message: err.message },
    });
    return;
  }

  console.error("[Unhandled Error]", err);
  res.status(500).json({
    error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" },
  });
}
