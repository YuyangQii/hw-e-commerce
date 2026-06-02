import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { AppError } from "./errors/custom-errors";
import { ErrorCode } from "./errors/error-codes";

// 通用验证中间件：接收一个 Zod schema，返回一个 Express 中间件函数
// 验证失败时抛 AppError，由 error.middleware 统一处理返回 400
// 用法：router.post("/", validate(createUserSchema), createUserController)
export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // 把 Zod 错误整理成 { fieldErrors: { email: ["Invalid email"] } } 格式
      const details = result.error.flatten().fieldErrors;
      // 抛给 error.middleware 统一处理
      return next(
        new AppError(
          JSON.stringify(details),
          400,
          ErrorCode.BAD_REQUEST,
        )
      );
    }

    // 验证成功：用 Zod 清洗过的数据替换原始 req.body（去掉多余字段）
    req.body = result.data;
    next();
  };
}
