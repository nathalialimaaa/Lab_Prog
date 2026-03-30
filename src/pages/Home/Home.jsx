import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import {
  FiGrid, FiPackage, FiPlusCircle, FiList, FiFileText, FiDollarSign, FiUsers,
  FiBriefcase, FiLogOut, FiMoon, FiSun, FiBell, FiSettings, FiChevronDown
} from 'react-icons/fi';
import { BsBoxSeam } from 'react-icons/bs';
import { MdOutlinePrecisionManufacturing, MdOutlineHardware } from 'react-icons/md';
import './Home.css';

const Home = () => {
  const { logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();

  // Esse objeto "user" é onde você colocará os dados que vierem do banco de dados/login.
  // Pode vir do LocalStorage, de um Context API ou props.
  const user = {
    name: "Nome do Usuário",
    role: "Função",
    avatar: "U" // Primeira letra do nome ou URL de foto
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
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
              <li className="menu-item active">
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
            <Link to="/nova-os" style={{ textDecoration: 'none' }}>
              <li className="menu-item">
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
      <main className="main-content">
        {/* Top Header */}
        <header className="top-header">
          <div className="search-bar-mock">
            <div className="url-mock">
              <span className="lock-icon">🔒</span> IntegraOS.com.br/dashboard
            </div>
          </div>
          <div className="header-actions">
            <FiBell className="action-icon" />
            <FiSettings className="action-icon" />
          </div>
        </header>

        {/* Dashboard Area */}
        <div className="dashboard-container">
          <div className="dashboard-title-row">
            <h1>Dashboard</h1>
            <div className="dashboard-filters">
              <span className="filter-tab active">Cards</span>
              <span className="filter-tab">Gráficos</span>
              <button className="filter-dropdown">
                Todos <FiChevronDown />
              </button>
            </div>
          </div>

          {/* Section: Ordens de Serviço */}
          <section className="dashboard-section">
            <h2 className="section-title">
              <FiGrid className="section-icon" /> Ordens de Serviço
            </h2>
            <div className="cards-grid">
              <div className="card">
                <div className="card-header">
                  <span className="card-title">Total de OS Ativas</span>
                  <FiGrid className="card-icon text-gray" />
                </div>
                <div className="card-value">61</div>
                <div className="card-desc">Ordens de Serviço não finalizadas</div>
              </div>
              <div className="card">
                <div className="card-header">
                  <span className="card-title">OS Aberta <span className="badge-alert">!</span></span>
                  <BsBoxSeam className="card-icon text-red" />
                </div>
                <div className="card-value">8</div>
              </div>
              <div className="card">
                <div className="card-header">
                  <span className="card-title">OS Em Análise</span>
                  <span className="card-icon text-yellow">▷</span>
                </div>
                <div className="card-value">3</div>
              </div>
              <div className="card">
                <div className="card-header">
                  <span className="card-title">OS Aguardando Terceiros <span className="badge-alert">!</span></span>
                  <span className="card-icon text-orange">⏳</span>
                </div>
                <div className="card-value">23</div>
              </div>

              <div className="card">
                <div className="card-header">
                  <span className="card-title">OS Aguardando Cliente <span className="badge-alert">!</span></span>
                  <FiUsers className="card-icon text-green" />
                </div>
                <div className="card-value">15</div>
              </div>
              <div className="card">
                <div className="card-header">
                  <span className="card-title">OS Aguardando Orçamento <span className="badge-alert">!</span></span>
                  <BsBoxSeam className="card-icon text-purple" />
                </div>
                <div className="card-value">3</div>
              </div>
              <div className="card">
                <div className="card-header">
                  <span className="card-title">OS Pronto para Retirada <span className="badge-alert">!</span></span>
                  <span className="card-icon text-teal">🚚</span>
                </div>
                <div className="card-value">9</div>
              </div>
              <div className="card">
                <div className="card-header">
                  <span className="card-title">OS Entregue</span>
                  <span className="card-icon text-blue">🛡️</span>
                </div>
                <div className="card-value">593</div>
              </div>
            </div>
          </section>

          {/* Section: Empréstimos */}
          <section className="dashboard-section">
            <h2 className="section-title">
              <FiPackage className="section-icon" /> Empréstimos
            </h2>
            <div className="cards-grid cols-4">
              <div className="card">
                <div className="card-header">
                  <span className="card-title">Equipamentos Disponíveis</span>
                  <MdOutlinePrecisionManufacturing className="card-icon text-gray" />
                </div>
                <div className="card-value">25</div>
              </div>
              <div className="card">
                <div className="card-header">
                  <span className="card-title">Equipamentos Emprestados</span>
                  <span className="card-icon text-gray">⇆</span>
                </div>
                <div className="card-value">6</div>
              </div>
              <div className="card">
                <div className="card-header">
                  <span className="card-title">Atrasados <span className="badge-alert">!</span></span>
                  <span className="card-icon text-gray">⏱️</span>
                </div>
                <div className="card-value">5</div>
              </div>
              <div className="card">
                <div className="card-header">
                  <span className="card-title">Próximas Devoluções</span>
                  <MdOutlineHardware className="card-icon text-gray" />
                </div>
                <div className="card-value">0</div>
                <div className="card-desc">nos próximos 7 dias</div>
              </div>
            </div>
          </section>

          {/* Section: Ranking */}
          <section className="dashboard-section">
            <h2 className="section-title">
              <FiUsers className="section-icon" /> Ranking
            </h2>
            <div className="ranking-grid">

              <div className="card ranking-card">
                <div className="ranking-header">
                  <span className="ranking-title">OS Criadas por Analista</span>
                  <FiUsers className="ranking-icon" />
                </div>
                <ul className="ranking-list">
                  {/* Dados a serem preenchidos pelo backend / banco de dados */}
                  <li><span>Nome do Analista</span> <strong>0</strong></li>
                </ul>
              </div>

              <div className="card ranking-card">
                <div className="ranking-header">
                  <span className="ranking-title">OS Finalizadas por Analista</span>
                  <FiUsers className="ranking-icon" />
                </div>
                <ul className="ranking-list">
                  {/* Dados a serem preenchidos pelo backend / banco de dados */}
                  <li><span>Nome do Analista</span> <strong>0</strong></li>
                </ul>
              </div>

            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default Home;
