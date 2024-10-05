export const fetchPatchClose = async (id) => {
    const response = await fetch(`http://localhost:3000/api/monitoramento/close/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
  