import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError, ErrorCode } from "../../core/errors";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      role?: string;
    }
  }
}

// JWT token
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next(new AppError("No token provided", 401, ErrorCode.UNAUTHORIZED));
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return next(new AppError("Invalid token", 401, ErrorCode.UNAUTHORIZED));
    }

    const payload = decoded as { userId: number; role: string };
    req.userId = payload.userId;
    req.role = payload.role;
    next();
  });
}

export function requireRole(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.role !== role) {
      return next(new AppError("Forbidden", 403, ErrorCode.UNAUTHORIZED));
    }
    next();
  };
}
