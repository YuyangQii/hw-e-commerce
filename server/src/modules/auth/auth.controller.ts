import { Request, Response } from "express";
import * as authService from "./auth.service";

export async function signupController(req: Request, res: Response) {
  const result = await authService.signup(req.body);
  res.status(201).json(result);
}

export async function loginController(req: Request, res: Response) {
  const result = await authService.login(req.body);
  res.json(result);
}

export async function logoutController(req: Request, res: Response) {
  const result = await authService.logout();
  res.json(result);
}

export async function getMeController(req: Request, res: Response) {
  // req.userId 由 requireAuth 中间件注入
  const result = await authService.getMe(req.userId!);
  res.json(result);
}
