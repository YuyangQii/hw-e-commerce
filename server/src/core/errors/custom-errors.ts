import { ErrorCode } from "./error-codes";

export class AppError extends Error {
  constructor(message: string, statusCode: number, errorCode: ErrorCode) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
  statusCode: number;
  errorCode: ErrorCode;
}
