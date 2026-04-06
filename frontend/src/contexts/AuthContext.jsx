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

const login = async (email, password) => {
  try {
    const response = await fetch("http://localhost:8081/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Credenciais inválidas");
    }

    const data = await response.json();

    localStorage.setItem("token", data.token);
    setUser({ email, token: data.token });
    navigate("/dashboard");
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
