import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Se o usuário não estiver logado (sem token), redireciona para a tela de login ("/")
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Se estiver logado, renderiza o componente filho (ex: Home)
  return children;
};

export default ProtectedRoute;
