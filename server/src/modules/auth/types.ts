// JWT token 里存放的用户信息
export type JwtPayload = {
  userId: number;
  role: string;
};
