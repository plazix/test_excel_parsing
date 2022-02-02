export function authHeader(): Record<string, string> {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr)
    user = JSON.parse(userStr);

  if (user && user.access_token) {
    return { "Authorization": user.token_type + ' ' + user.access_token };
  } else {
    return {};
  }
}
