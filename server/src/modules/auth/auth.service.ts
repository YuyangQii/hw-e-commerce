import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppError, ErrorCode } from "../../core/errors";
import * as userRepo from "../users/user.repository";
import * as userService from "../users/user.service";
import { SignupInput, LoginInput } from "./auth.validator";

function generateToken(userId: number, role: string) {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
}

export async function signup(data: SignupInput) {
  const user = await userService.createUser(data);
  const token = generateToken(user.id, user.role);
  return { user, token };
}

export async function login(data: LoginInput) {
  const user = await userRepo.findByUsername(data.username);
  if (!user) {
    throw new AppError("Invalid credentials", 401, ErrorCode.UNAUTHORIZED);
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 401, ErrorCode.UNAUTHORIZED);
  }

  const token = generateToken(user.id, user.role);
  return { token };
}

export async function logout() {
  return { message: "Logged out successfully" };
}

export async function getMe(userId: number) {
  const user = await userService.getUserById(userId);
  return user;
}
