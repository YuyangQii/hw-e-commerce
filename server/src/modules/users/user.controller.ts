import { Request, Response } from "express";
import { getAllUsers, getUserById, searchUser, createUser, updateUser, deleteUser } from "./user.service";

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
  const user = await updateUser(id, req.body);
  res.json(user);
}

export async function deleteUserController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const user = await deleteUser(id);
  res.json(user);
}
