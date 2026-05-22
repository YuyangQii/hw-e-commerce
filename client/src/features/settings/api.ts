export async function updateUser(userId: number, firstName: string, lastName: string, email: string) {
  const res = await fetch(`https://dummyjson.com/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email }),
  });
  const data = await res.json();
  return data;
}
