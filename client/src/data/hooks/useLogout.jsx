// hooks/useLogout.jsx
import { useState } from "react";
import { fetchLogout } from "../services/logout";

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async () => {
    setIsLoading(true);
    setError(null);
    try {
      sessionStorage.removeItem("user");
      await fetchLogout();
    } catch (err) {
      setError(err.response || { message: "An unknown error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, execute };
};

export default useLogout;
