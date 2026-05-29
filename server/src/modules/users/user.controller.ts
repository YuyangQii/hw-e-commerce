import { Request, Response } from "express";
import { getAllUsers, getUserById, searchUser, createUser, updateUser, deleteUser } from "./user.service";

export function getAllUsersController(req: Request, res: Response) {
  const users = getAllUsers();
  res.json(users);
}

export function getUserByIdController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const user = getUserById(id);
  res.json(user);
}

export function searchUserController(req: Request, res: Response) {
  const username = String(req.query.username || "");
  const email = String(req.query.email || "");
  const user = searchUser(username, email);
  res.json(user);
}

export function createUserController(req: Request, res: Response) {
  const user = createUser(req.body);
  res.status(201).json(user);
}

export function updateUserController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const user = updateUser(id, req.body);
  res.json(user);
}

export function deleteUserController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const user = deleteUser(id);
  res.json(user);
}
