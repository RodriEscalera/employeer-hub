"use client";
function saveTokenLocalStorage(token: string): void {
  localStorage.setItem("token", token);
}

function getTokenLocalStorage(): string | null {
  const tokenUser = localStorage.getItem("token");
  return tokenUser;
}

export { saveTokenLocalStorage, getTokenLocalStorage };
