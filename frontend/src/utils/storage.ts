export function saveUser(user: { id: string; name: string }) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  const userData = localStorage.getItem("user");

  if (userData) {
    return JSON.parse(userData);
  }

  return null;
}

export function removeUser() {
  localStorage.removeItem("user");
}
