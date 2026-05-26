import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/pages/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.user) {
      navigate("/login");
    }
  }, [auth?.user])

  return <Outlet />;
};

export default ProtectedRoute;
