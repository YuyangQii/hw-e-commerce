import { Request, Response } from "express";
import { getAllUsers, getUserById, searchUser, createUser, updateUser, deleteUser } from "./user.service";
import { AppError, ErrorCode } from "../../core/errors";

export async function getAllUsersController(req: Request, res: Response) {
  const users = await getAllUsers();
  res.json(users);
}

export async function getUserByIdController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const user = await getUserById(id);
  res.json(user);
}

export async function searchUserController(req: Request, res: Response) {
  const username = String(req.query.username || "");
  const email = String(req.query.email || "");
  const user = await searchUser(username, email);
  res.json(user);
}

export async function createUserController(req: Request, res: Response) {
  const user = await createUser(req.body);
  res.status(201).json(user);
}

export async function updateUserController(req: Request, res: Response) {
  const id = Number(req.params.id);
  // 只能修改自己，admin 可以修改任何人
  if (req.userId !== id && req.role !== "admin") {
    throw new AppError("Forbidden", 403, ErrorCode.UNAUTHORIZED);
  }
  const user = await updateUser(id, req.body);
  res.json(user);
}

export async function deleteUserController(req: Request, res: Response) {
  const id = Number(req.params.id);
  // 只能删除自己，admin 可以删除任何人
  if (req.userId !== id && req.role !== "admin") {
    throw new AppError("Forbidden", 403, ErrorCode.UNAUTHORIZED);
  }
  const user = await deleteUser(id);
  res.json(user);
}
