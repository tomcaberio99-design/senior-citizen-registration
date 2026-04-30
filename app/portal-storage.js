const USERS_KEY = "seniorPortalUsers";
const SESSION_KEY = "seniorPortalSession";

function safeRead(key, fallback) {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function getUsers() {
  return safeRead(USERS_KEY, []);
}

export function saveUser(user) {
  const users = getUsers();
  const nextUsers = [...users.filter((item) => item.email !== user.email), user];
  window.localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));
}

export function findUserByEmail(email) {
  return getUsers().find((user) => user.email === String(email).trim().toLowerCase()) || null;
}

export function setSession(session) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession() {
  return safeRead(SESSION_KEY, null);
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}
