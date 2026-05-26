import type { AuthUser, LoginInput } from "./pages/type";

async function wait(time: number = 500) {
  return new Promise((res) => setTimeout(() => res(null), time));
}

export async function loginUser(input: LoginInput):Promise<AuthUser> {
  await wait();
  const res = await fetch("https://dummyjson.com/auth/login",{
    method: "POST",
    headers: {"Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({username: input.username, password: input.password, expiresInMins: 60}),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data as AuthUser;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const res = await fetch("https://dummyjson.com/auth/me", {
    credentials: "include",
  });
  if (!res.ok) return null;
  return res.json();
}