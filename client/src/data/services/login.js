export const fetchLogin = async (email, password) => {
  const response = await fetch(`http://localhost:3000/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error("An error occurred");
    error.response = errorData;
    throw error;
  }
  const data = await response.json();
  return data;
};
