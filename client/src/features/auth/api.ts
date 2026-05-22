import type { AuthUser, LoginInput } from "./pages/type";


export async function loginUser(input: LoginInput):Promise<AuthUser> {
  const res = await fetch("https://dummyjson.com/auth/login",{
    method: "POST",
    headers: {"Content-Type": "application/json" },
    body: JSON.stringify({username: input.username, password: input.password, expiresInMins: 60}),
  });
  const data = await res.json();
  return data as AuthUser;
}

export function logoutUser(){
  localStorage.removeItem("token");
  localStorage.removeItem("user")
}