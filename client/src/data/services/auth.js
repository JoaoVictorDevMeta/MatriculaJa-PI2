export const validateUser = async () => {
  const response = await fetch("http://localhost:3000/api/auth/validate", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error("Invalid token");
    error.response = errorData;
    throw error;
  }

  return response.text();
};
