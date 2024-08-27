export function auth() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
 
  return auth();
}
