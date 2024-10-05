import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../services/auth";
import useLogout from "./useLogout";
import LoadingScreen from "../../ui/components/loading/LoadingScreen";
import { sleep } from "../utils/sleep";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const { execute: logout } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      try {
        await sleep(1000);
        await validateUser();
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        await logout();
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return children;
};

export default ProtectedRoute;
