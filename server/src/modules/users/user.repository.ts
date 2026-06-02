import { eq, or } from "drizzle-orm";
import { db } from "../../db";
import { users } from "./user.schema";
import { NewUser } from "./types";


export async function findAll() {
  return db.select().from(users);
}

export async function findById(id: number) {
  const result = await db.select().from(users).where(eq(users.id, id));
  return result[0];
}

export async function findByUsernameOrEmail(username: string, email: string) {
  const result = await db
    .select()
    .from(users)
    .where(or(eq(users.username, username), eq(users.email, email)));
  return result[0];
}

export async function findByUsername(username: string) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.username, username));
  return result[0];
}

export async function create(data: NewUser) {
  const result = await db.insert(users).values(data).returning();
  return result[0];
}

export async function update(id: number, data: Partial<NewUser>) {
  const result = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();
  return result[0];
}

export async function remove(id: number) {
  const result = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning();
  return result[0];
}
