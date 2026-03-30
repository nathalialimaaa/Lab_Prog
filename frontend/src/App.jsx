import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import EsqueciSenha from './pages/EsqueciSenha/EsqueciSenha';
import Home from './pages/Home/Home';
import NovaOS from './pages/NovaOS/NovaOS';
import ProntasEntrega from './pages/ProntasEntrega/ProntasEntrega';
import DetalhesOS from './pages/DetalhesOS/DetalhesOS';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

// Componente empacotador que aplica o layout e background exclusivo nas telas de Auth
const AuthContainer = ({ children }) => (
  <div className="auth-layout">{children}</div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<AuthContainer><Login /></AuthContainer>} />
            <Route path="/cadastro" element={<AuthContainer><Cadastro /></AuthContainer>} />
            <Route path="/esqueci-senha" element={<AuthContainer><EsqueciSenha /></AuthContainer>} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/nova-os" element={<ProtectedRoute><NovaOS /></ProtectedRoute>} />
            <Route path="/prontas-entrega" element={<ProtectedRoute><ProntasEntrega /></ProtectedRoute>} />
            <Route path="/os/:id" element={<ProtectedRoute><DetalhesOS /></ProtectedRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
