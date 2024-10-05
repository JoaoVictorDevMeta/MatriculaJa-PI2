export const fetchLogout = async () => {
  const response = await fetch(`http://localhost:3000/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();
  return data;
};
