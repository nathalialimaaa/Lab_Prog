import { useState, useContext } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./Login.css";

const Login = () => {
  // Estados para armazenar as entradas do usuário
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext); // Obtém a função de login do contexto

  // Função que é chamada quando o formulário é enviado
  const handleSubmit = (event) => {
    // Impede que a página seja recarregada
    event.preventDefault();

    // Faz o console log das credenciais do usuário
    console.log("Dados de Login:", { username, password });
    
    // Chama o login do contexto passando as credenciais
    login(username, password);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Integra OS</h1>
        <div className="input-field">
          <input
            type="email"
            placeholder="E-mail"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>

        <div className="recall-forget">
          <label>
            <input type="checkbox" />
            Lembrar senha
          </label>
          <Link to="/esqueci-senha">Esqueci a senha</Link>
        </div>
        <button type="submit">Login</button>
        <div className="signup-link">
          <p>
            Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;