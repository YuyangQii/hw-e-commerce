import { AppError, ErrorCode } from "../../core/errors";
import { UserResponse, NewUser } from "./types";
import * as userRepo from "./user.repository";

// 去掉 password 再返回给前端
function removePassword(user: { id: number; username: string; email: string; firstName: string; lastName: string; role: string; password: string; phone?: string | null; image?: string | null }): UserResponse {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };
}

export async function getAllUsers(): Promise<UserResponse[]> {
  const users = await userRepo.findAll();
  return users.map(removePassword);
}

export async function getUserById(id: number): Promise<UserResponse> {
  const user = await userRepo.findById(id);
  if (!user) {
    throw new AppError("User not found", 404, ErrorCode.NOT_FOUND);
  }
  return removePassword(user);
}

export async function searchUser(username: string, email: string): Promise<UserResponse> {
  const user = await userRepo.findByUsernameOrEmail(username, email);
  if (!user) {
    throw new AppError("User not found", 404, ErrorCode.NOT_FOUND);
  }
  return removePassword(user);
}

export async function createUser(data: Omit<NewUser, "id">): Promise<UserResponse> {
  const user = await userRepo.create(data);
  return removePassword(user);
}

export async function updateUser(id: number, data: Partial<Omit<NewUser, "id">>): Promise<UserResponse> {
  const user = await userRepo.update(id, data);
  if (!user) {
    throw new AppError("User not found", 404, ErrorCode.NOT_FOUND);
  }
  return removePassword(user);
}

export async function deleteUser(id: number): Promise<UserResponse> {
  const user = await userRepo.remove(id);
  if (!user) {
    throw new AppError("User not found", 404, ErrorCode.NOT_FOUND);
  }
  return removePassword(user);
}
