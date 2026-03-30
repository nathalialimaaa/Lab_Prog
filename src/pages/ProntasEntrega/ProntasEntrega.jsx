import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import {
  FiGrid, FiPackage, FiPlusCircle, FiList, FiFileText, FiDollarSign, FiUsers,
  FiBriefcase, FiLogOut, FiMoon, FiSun, FiBell, FiSettings, FiSearch
} from 'react-icons/fi';
import { BsBoxSeam } from 'react-icons/bs';
import { AiOutlineWarning } from 'react-icons/ai'; // Ícone de alerta
import './ProntasEntrega.css';
import '../Home/Home.css';

const ProntasEntrega = () => {
  const { logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();
  const [ordens, setOrdens] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const user = {
    name: "Brenda Proença",
    role: "Suporte Técnico",
    avatar: "B"
  };

  useEffect(() => {
    // Dados fiéis ao screenshot enviado pelo usuário
    const mockData = [
      { idOs: 'OS-645', cliente: 'Colibri', equipamento: 'Notebook Dell Inspiron 15 3530', dataAbertura: '16/03/2026', tempoText: '7min', tempoMeta: '23h', tempoCor: 'green', tempoProgresso: '20%', status: 'Pronto Para Retirada' },
      { idOs: 'OS-643', cliente: 'Silva e Silva', equipamento: 'Notebook Dell Inspiron 14 7440 2-in-1', dataAbertura: '16/03/2026', tempoText: '15h', tempoMeta: '8h', tempoCor: 'yellow', tempoProgresso: '60%', status: 'Pronto Para Retirada' },
      { idOs: 'OS-640', cliente: 'Okuyama', equipamento: 'Desktop Generico Generico', dataAbertura: '13/03/2026', tempoText: '1d', tempoMeta: '', tempoCor: 'red', tempoProgresso: '100%', status: 'Pronto Para Retirada' },
      { idOs: 'OS-638', cliente: 'L2 Agronegócios', equipamento: 'Impressora Brother 7535', dataAbertura: '13/03/2026', tempoText: '4d 20h', tempoMeta: '', tempoCor: 'red', tempoProgresso: '100%', status: 'Pronto Para Retirada' },
      { idOs: 'OS-626', cliente: 'HsPrates', equipamento: 'Nobreak SMS 600', dataAbertura: '11/03/2026', tempoText: '6d 18h', tempoMeta: '', tempoCor: 'red', tempoProgresso: '100%', status: 'Pronto Para Retirada' },
      { idOs: 'OS-596', cliente: 'HortVida', equipamento: 'Impressora Epson L3150', dataAbertura: '02/03/2026', tempoText: '1d 22h', tempoMeta: '', tempoCor: 'red', tempoProgresso: '100%', status: 'Pronto Para Retirada' },
      { idOs: 'OS-564', cliente: 'L2 Agronegócios', equipamento: 'Impressora Epson L5190', dataAbertura: '25/02/2026', tempoText: '5d 16h', tempoMeta: '', tempoCor: 'red', tempoProgresso: '100%', status: 'Pronto Para Retirada' },
      { idOs: 'OS-399', cliente: 'Sekita Agronegócios', equipamento: 'Monitor Samsung Syncmaster 732nw', dataAbertura: '14/01/2026', tempoText: '4d 18h', tempoMeta: '', tempoCor: 'red', tempoProgresso: '100%', status: 'Pronto Para Retirada' },
    ];
    setOrdens(mockData);
  }, []);

  const filteredOrdens = ordens.filter(os => 
    os.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    os.idOs.toLowerCase().includes(searchTerm.toLowerCase()) ||
    os.equipamento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-layout">
      {/* Sidebar - Reutilizada e mantida intacta */}
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
              <li className="menu-item active">
                <FiPackage className="menu-icon" />
                <span>Prontas p/ Entrega</span>
              </li>
            </Link>
            <Link to="/nova-os" style={{ textDecoration: 'none' }}>
              <li className="menu-item">
                <FiPlusCircle className="menu-icon" />
                <span>Nova OS</span>
              </li>
            </Link>
            <li className="menu-item"><FiList className="menu-icon" /><span>Todas as OS</span></li>
            <li className="menu-item"><FiFileText className="menu-icon" /><span>Orçamentos</span></li>
            <li className="menu-item"><FiDollarSign className="menu-icon" /><span>Empréstimos</span></li>
            <li className="menu-item"><FiUsers className="menu-icon" /><span>Clientes</span></li>
          </ul>

          <p className="menu-label mt-4">ADMINISTRAÇÃO</p>
          <ul className="menu-list">
            <li className="menu-item"><FiBriefcase className="menu-icon" /><span>Patrimônio</span></li>
          </ul>
        </div>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar" style={{backgroundColor: '#3b82f6'}}>{user.avatar}</div>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role}</span>
            </div>
          </div>
          <div className="theme-logout">
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              title={isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
            >
              {isDark ? <FiSun className="footer-icon" /> : <FiMoon className="footer-icon" />}
            </button>
            <button onClick={logout} className="logout-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <FiLogOut className="footer-icon" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ backgroundColor: '#f9fafb' }}>
        <header className="top-header">
          <div className="search-bar-mock">
            <div className="url-mock">
              <span className="lock-icon">🔒</span> controleos.tsmit.com.br/dashboard/ready-for-pickup
            </div>
          </div>
          <div className="header-actions">
            <FiBell className="action-icon" />
            <FiSettings className="action-icon" />
          </div>
        </header>

        <div className="dashboard-container prontas-container">
          <div className="prontas-header-container">
            <div className="prontas-title-row">
              <BsBoxSeam className="title-icon-box" />
              <h1>OS Prontas para Entrega</h1>
            </div>
            
            <div className="search-box-out">
              <input 
                type="text" 
                placeholder="Buscar OS por numero, cliente, equipamento, analista, status..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Tabela de Dados */}
          <div className="table-card">
            <h2 className="table-card-title">Equipamentos aguardando retirada</h2>
            
            <table className="os-table">
              <thead>
                <tr>
                  <th>OS</th>
                  <th>Cliente</th>
                  <th>Equipamento</th>
                  <th>Data de Abertura</th>
                  <th>Tempo no Status</th>
                  <th>Status</th>
                  <th className="text-center">Acoes</th>
                </tr>
              </thead>
              <tbody>
                {ordens.length > 0 ? (
                  ordens.map((os) => {
                    const isMatch = os.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    os.idOs.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    os.equipamento.toLowerCase().includes(searchTerm.toLowerCase());
                    
                    return (
                      <tr key={os.idOs} className={`os-row ${isMatch ? 'show-row' : 'hide-row'}`}>
                        <td className="font-bold">{os.idOs}</td>
                        <td>{os.cliente}</td>
                        <td>{os.equipamento}</td>
                        <td>{os.dataAbertura}</td>
                        <td className="time-status-cell">
                          <span className={`time-text time-${os.tempoCor}`}>{os.tempoText}</span>
                          <div className="time-progress-container">
                            <div className={`time-progress-bar bar-${os.tempoCor}`} style={{ width: os.tempoProgresso }}></div>
                          </div>
                          {os.tempoMeta ? (
                            <span className="time-meta">{os.tempoMeta}</span>
                          ) : (
                            <AiOutlineWarning className="warning-icon text-red" />
                          )}
                        </td>
                        <td>
                          <span className="status-badge-green">{os.status}</span>
                        </td>
                        <td className="actions-cell">
                          <Link to={`/os/${os.idOs}`}>
                            <button className="btn-table-action">Ver</button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center empty-state">Nenhuma OS encontrada.</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="table-footer">
              <div className="pagination-info">
                <span>Itens por pagina: </span>
                <select className="select-pagination">
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
                <span className="pagination-count">({filteredOrdens.length} registros)</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProntasEntrega;
