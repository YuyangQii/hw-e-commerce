import { User, UserResponse } from "./types";
import { AppError, ErrorCode } from "../../core/errors";
import usersData from "../../db/seed/users.json";

const users: User[] = usersData.map(function (userData, index) {
  const user: User = {
    id: index + 1,
    username: userData.username,
    email: userData.email,
    password: userData.plainPassword,
    firstName: userData.firstName,
    lastName: userData.lastName,
  };
  return user;
});

function removePassword(user: User): UserResponse {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
}

export function getAllUsers(): UserResponse[] {
  return users.map(removePassword);
}

export function getUserById(id: number): UserResponse {
  const user = users.find(function (item) {
    return item.id === id;
  });
  if (!user) {
    throw new AppError("User not found", 404, ErrorCode.NOT_FOUND);
  }
  return removePassword(user);
}

export function searchUser(username: string, email: string): UserResponse {
  const user = users.find(function (item) {
    return item.username === username || item.email === email;
  });
  if (!user) {
    throw new AppError("User not found", 404, ErrorCode.NOT_FOUND);
  }
  return removePassword(user);
}

export function createUser(data: Omit<User, "id">): UserResponse {
  const newUser: User = {
    id: users.length + 1,
    ...data,
  };
  users.push(newUser);
  return removePassword(newUser);
}

export function updateUser(id: number, data: Partial<Omit<User, "id">>): UserResponse {
  const index = users.findIndex(function (item) {
    return item.id === id;
  });
  if (index === -1) {
    throw new AppError("User not found", 404, ErrorCode.NOT_FOUND);
  }
  users[index] = { ...users[index], ...data };
  return removePassword(users[index]);
}

export function deleteUser(id: number): UserResponse {
  const index = users.findIndex(function (item) {
    return item.id === id;
  });
  if (index === -1) {
    throw new AppError("User not found", 404, ErrorCode.NOT_FOUND);
  }
  const deleted = users.splice(index, 1)[0];
  return removePassword(deleted);
}
