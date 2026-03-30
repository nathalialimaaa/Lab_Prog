import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Ao iniciar a aplicação, verifica se existe um token salvo
    const token = localStorage.getItem("token");
    if (token) {
      // Opcional: fazer uma requisição para verificar se o token é válido
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      /* 
      // ===== IMPLEMENTAÇÃO REAL COM BACKEND =====
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });
      
      if (!response.ok) throw new Error("Credenciais inválidas");
      const data = await response.json();
      */

      // ===== SIMULAÇÃO DE LOGIN (Remover depois de integrar o backend) =====
      console.log("Validando:", username, password);
      const data = { token: "seu_token_jwt_simulado_aqui" };
      // ======================================================================

      if (data.token) {
        localStorage.setItem("token", data.token); // Salva o token no localStorage
        setUser({ token: data.token });           // Atualiza o estado
        navigate("/home");                        // Redireciona para a home
      }
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
