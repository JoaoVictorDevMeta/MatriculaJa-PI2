export const fetchAwnserComunicacao = async (data, id, userId) => {
    const response = await fetch(`http://localhost:3000/api/monitoramento/${id}/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if(result.error){
      throw new Error(result.error);
    }
    return result;
  };
  