// /utils/api.js
export async function fetchUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
}
