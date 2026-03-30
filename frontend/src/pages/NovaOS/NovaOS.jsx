import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import {
  FiGrid, FiPackage, FiPlusCircle, FiList, FiFileText, FiDollarSign, FiUsers,
  FiBriefcase, FiLogOut, FiMoon, FiBell, FiSettings
} from 'react-icons/fi';
import './NovaOS.css';
import '../Home/Home.css'; // Reaproveitando os estilos do layout principal

const NovaOS = () => {
  const { logout } = useContext(AuthContext);

  // Simulando dados do usuário logado
  const user = {
    name: "Nome do Usuário",
    role: "Suporte Técnico",
    avatar: "U"
  };

  // Estados dos campos do formulário
  const [formData, setFormData] = useState({
    cliente: '',
    nomeContato: '',
    emailContato: '',
    telefoneContato: '',
    tipoEquipamento: '',
    marca: '',
    modelo: '',
    numeroSerie: '',
    problemaRelatado: ''
  });

  // Estado para mensagem de sucesso
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OS Criada com os dados:", formData);
    
    // Substituindo o alert nativo por uma mensagem customizada
    setSuccessMsg("Ordem de Serviço criada com sucesso!");
    
    // Limpar formulário (opcional)
    setFormData({
      cliente: '', nomeContato: '', emailContato: '', telefoneContato: '',
      tipoEquipamento: '', marca: '', modelo: '', numeroSerie: '', problemaRelatado: ''
    });

    // Oculta a mensagem depois de 4 segundos
    setTimeout(() => {
      setSuccessMsg('');
    }, 4000);
    
    // Aqui você faria a integração com o backend (axios.post, fetch, etc)
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar - Menu Lateral */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">●●</span>
            <span className="logo-text">Integra OS</span>
          </div>
          <p className="logo-subtext">Confiabilidade e Inovação</p>
        </div>

        <div className="sidebar-menu">
          <p className="menu-label">PRINCIPAL</p>
          <ul className="menu-list">
            <Link to="/home" style={{ textDecoration: 'none' }}>
              <li className="menu-item">
                <FiGrid className="menu-icon" />
                <span>Dashboard</span>
              </li>
            </Link>
            <Link to="/prontas-entrega" style={{ textDecoration: 'none' }}>
              <li className="menu-item">
                <FiPackage className="menu-icon" />
                <span>Prontas para Entrega</span>
              </li>
            </Link>
            {/* Item ativo agora é o Nova OS */}
            <Link to="/nova-os" style={{ textDecoration: 'none' }}>
              <li className="menu-item active">
                <FiPlusCircle className="menu-icon" />
                <span>Nova OS</span>
              </li>
            </Link>
            <li className="menu-item">
              <FiList className="menu-icon" />
              <span>Todas as OS</span>
            </li>
            <li className="menu-item">
              <FiFileText className="menu-icon" />
              <span>Orçamentos</span>
            </li>
            <li className="menu-item">
              <FiDollarSign className="menu-icon" />
              <span>Empréstimos</span>
            </li>
            <li className="menu-item">
              <FiUsers className="menu-icon" />
              <span>Clientes</span>
            </li>
          </ul>

          <p className="menu-label mt-4">ADMINISTRAÇÃO</p>
          <ul className="menu-list">
            <li className="menu-item">
              <FiBriefcase className="menu-icon" />
              <span>Patrimônio</span>
            </li>
          </ul>
        </div>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">{user.avatar}</div>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role}</span>
            </div>
          </div>
          <div className="theme-logout">
            <FiMoon className="footer-icon" />
            <button onClick={logout} className="logout-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <FiLogOut className="footer-icon" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content - Conteúdo Principal */}
      <main className="main-content" style={{ backgroundColor: '#f9fafb' }}>
        <header className="top-header">
          <div className="search-bar-mock">
            <div className="url-mock">
              <span className="lock-icon">🔒</span> IntegraOS.com.br/os/new
            </div>
          </div>
          <div className="header-actions">
            <FiBell className="action-icon" />
            <FiSettings className="action-icon" />
          </div>
        </header>

        {/* Notificação de Sucesso */}
        {successMsg && (
          <div className="toast-success">
            <FiBell className="toast-icon" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Área do Formulário da Nova OS */}
        <div className="dashboard-container nova-os-container">
          <div className="nova-os-header">
            <FiPlusCircle className="title-icon" />
            <h1>Nova Ordem de Servico</h1>
          </div>

          <div className="form-card">
            <form className="nova-os-form" onSubmit={handleSubmit}>
            <div className="form-grid-2-cols">
              
              {/* Painel Esquerdo: Cliente e Contato */}
              <div className="form-panel">
                <h2 className="panel-title">Cliente e Contato</h2>
                
                <div className="form-group">
                  <label>Empresa / Cliente</label>
                  <select 
                    name="cliente" 
                    value={formData.cliente} 
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Selecione um cliente...</option>
                    <option value="1">Cliente João Silva</option>
                    <option value="2">Empresa ABC Corp</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Nome do Contato</label>
                  <input 
                    type="text" 
                    name="nomeContato"
                    value={formData.nomeContato} 
                    onChange={handleChange}
                    placeholder="Nome do responsável" 
                  />
                </div>
                
                <div className="form-group">
                  <label>E-mail do Contato</label>
                  <input 
                    type="email" 
                    name="emailContato"
                    value={formData.emailContato} 
                    onChange={handleChange}
                    placeholder="email@exemplo.com" 
                  />
                </div>
                
                <div className="form-group">
                  <label>Telefone do Contato</label>
                  <input 
                    type="tel" 
                    name="telefoneContato"
                    value={formData.telefoneContato} 
                    onChange={handleChange}
                    placeholder="(XX) XXXXX-XXXX" 
                  />
                </div>
              </div>
              
              {/* Painel Direito: Equipamento */}
              <div className="form-panel">
                <h2 className="panel-title">Equipamento</h2>
                
                <div className="form-group">
                  <label>Tipo</label>
                  <select 
                    name="tipoEquipamento"
                    value={formData.tipoEquipamento} 
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Selecione o tipo...</option>
                    <option value="notebook">Notebook</option>
                    <option value="desktop">Desktop PC</option>
                    <option value="impressora">Impressora</option>
                    <option value="servidor">Servidor</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Marca</label>
                  <input 
                    type="text" 
                    name="marca"
                    value={formData.marca} 
                    onChange={handleChange}
                    placeholder="Dell, HP..." 
                  />
                </div>
                
                <div className="form-group">
                  <label>Modelo</label>
                  <input 
                    type="text" 
                    name="modelo"
                    value={formData.modelo} 
                    onChange={handleChange}
                    placeholder="Latitude 7490..." 
                  />
                </div>
                
                <div className="form-group">
                  <label>Numero de Serie</label>
                  <input 
                    type="text" 
                    name="numeroSerie"
                    value={formData.numeroSerie} 
                    onChange={handleChange}
                    placeholder="S/N" 
                  />
                </div>
              </div>
            </div>

            {/* Painel Inferior: Descrição do Problema */}
            <div className="form-panel mt-4">
              <h2 className="panel-title">Detalhes do Problema</h2>
              <p className="panel-subtitle">Descreva o problema relatado. O analista será você ({user.name}).</p>
              
              <div className="form-group">
                <label style={{ display: 'none' }}>Problema Relatado</label>
                <textarea 
                  name="problemaRelatado"
                  value={formData.problemaRelatado} 
                  onChange={handleChange}
                  rows="5" 
                  placeholder="Explique em detalhes..."
                  required
                ></textarea>
              </div>
            </div>

            {/* Botão de Enviar */}
            <div className="form-actions">
              <button type="submit" className="btn-primary">Criar OS</button>
            </div>
          </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NovaOS;
