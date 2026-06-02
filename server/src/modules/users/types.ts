// 直接从 schema 推导类型，不再手动维护
export type { User, NewUser } from "./user.schema";

// 返回给用户信息去掉 password
export type UserResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};
