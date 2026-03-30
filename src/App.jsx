import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import EsqueciSenha from './pages/EsqueciSenha/EsqueciSenha';
import Home from './pages/Home/Home';
import NovaOS from './pages/NovaOS/NovaOS';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/esqueci-senha" element={<EsqueciSenha />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/nova-os" element={<ProtectedRoute><NovaOS /></ProtectedRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
