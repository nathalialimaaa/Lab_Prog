import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import {
  FiGrid, FiPackage, FiPlusCircle, FiList, FiFileText, FiDollarSign, FiUsers,
  FiBriefcase, FiLogOut, FiMoon, FiSun, FiBell, FiSettings, FiSearch,
  FiFilter, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import { BsListUl } from 'react-icons/bs';
import '../Home/Home.css';
import './TodasOS.css';

const mockOrdens = [
  { idOs: 'OS-648', cliente: 'TechCorp', equipamento: 'Notebook Dell Inspiron 15', analista: 'Ana Silva', dataAbertura: '28/03/2026', status: 'Em Análise' },
  { idOs: 'OS-647', cliente: 'Okuyama', equipamento: 'Desktop HP ProDesk 400', analista: 'Bruno Melo', dataAbertura: '27/03/2026', status: 'Aberta' },
  { idOs: 'OS-646', cliente: 'HortVida', equipamento: 'Impressora Epson L3150', analista: 'Carla Souza', dataAbertura: '27/03/2026', status: 'Aguardando Cliente' },
  { idOs: 'OS-645', cliente: 'Colibri', equipamento: 'Notebook Dell Inspiron 15 3530', analista: 'Bruno Melo', dataAbertura: '16/03/2026', status: 'Pronto Para Retirada' },
  { idOs: 'OS-644', cliente: 'L2 Agronegócios', equipamento: 'Switch Cisco SG110-16', analista: 'Ana Silva', dataAbertura: '20/03/2026', status: 'Aguardando Terceiros' },
  { idOs: 'OS-643', cliente: 'Silva e Silva', equipamento: 'Notebook Dell Inspiron 14 7440', analista: 'Diego Ferreira', dataAbertura: '16/03/2026', status: 'Pronto Para Retirada' },
  { idOs: 'OS-642', cliente: 'HsPrates', equipamento: 'Monitor LG 24MK430', analista: 'Carla Souza', dataAbertura: '15/03/2026', status: 'Aguardando Orçamento' },
  { idOs: 'OS-641', cliente: 'ABC Corp', equipamento: 'Servidor Dell PowerEdge T30', analista: 'Ana Silva', dataAbertura: '14/03/2026', status: 'Em Análise' },
  { idOs: 'OS-640', cliente: 'Okuyama', equipamento: 'Desktop Genérico', analista: 'Bruno Melo', dataAbertura: '13/03/2026', status: 'Pronto Para Retirada' },
  { idOs: 'OS-639', cliente: 'Sekita Agro', equipamento: 'Nobreak APC 1500VA', analista: 'Diego Ferreira', dataAbertura: '12/03/2026', status: 'Entregue' },
  { idOs: 'OS-638', cliente: 'L2 Agronegócios', equipamento: 'Impressora Brother 7535', analista: 'Carla Souza', dataAbertura: '13/03/2026', status: 'Pronto Para Retirada' },
  { idOs: 'OS-637', cliente: 'TechCorp', equipamento: 'Notebook Lenovo ThinkPad E14', analista: 'Ana Silva', dataAbertura: '11/03/2026', status: 'Entregue' },
  { idOs: 'OS-636', cliente: 'HortVida', equipamento: 'Desktop Dell OptiPlex 3080', analista: 'Bruno Melo', dataAbertura: '10/03/2026', status: 'Aberta' },
  { idOs: 'OS-635', cliente: 'Colibri', equipamento: 'Monitor Samsung 32"', analista: 'Diego Ferreira', dataAbertura: '09/03/2026', status: 'Aguardando Cliente' },
  { idOs: 'OS-634', cliente: 'HsPrates', equipamento: 'Notebook HP Pavilion 14', analista: 'Carla Souza', dataAbertura: '08/03/2026', status: 'Entregue' },
];

const STATUS_OPTIONS = [
  'Todos',
  'Aberta',
  'Em Análise',
  'Aguardando Terceiros',
  'Aguardando Cliente',
  'Aguardando Orçamento',
  'Pronto Para Retirada',
  'Entregue',
];

const STATUS_STYLE = {
  'Aberta':                { bg: '#fee2e2', color: '#dc2626' },
  'Em Análise':            { bg: '#fef9c3', color: '#ca8a04' },
  'Aguardando Terceiros':  { bg: '#ffedd5', color: '#ea580c' },
  'Aguardando Cliente':    { bg: '#e0f2fe', color: '#0284c7' },
  'Aguardando Orçamento':  { bg: '#ede9fe', color: '#7c3aed' },
  'Pronto Para Retirada':  { bg: '#dcfce7', color: '#16a34a' },
  'Entregue':              { bg: '#f1f5f9', color: '#475569' },
};

const ITEMS_PER_PAGE = 10;

const TodasOS = () => {
  const { logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();

  const user = { name: 'Nome do Usuário', role: 'Função', avatar: 'U' };

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = mockOrdens.filter((os) => {
    const matchSearch =
      os.idOs.toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.equipamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.analista.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'Todos' || os.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleStatusFilter = (s) => {
    setStatusFilter(s);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
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
            <Link to="/nova-os" style={{ textDecoration: 'none' }}>
              <li className="menu-item">
                <FiPlusCircle className="menu-icon" />
                <span>Nova OS</span>
              </li>
            </Link>
            <Link to="/todas-os" style={{ textDecoration: 'none' }}>
              <li className="menu-item active">
                <FiList className="menu-icon" />
                <span>Todas as OS</span>
              </li>
            </Link>
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
            <button
              onClick={logout}
              className="logout-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <FiLogOut className="footer-icon" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-header">
          <div className="search-bar-mock">
            <div className="url-mock">
              <span className="lock-icon">🔒</span> IntegraOS.com.br/os
            </div>
          </div>
          <div className="header-actions">
            <FiBell className="action-icon" />
            <FiSettings className="action-icon" />
          </div>
        </header>

        <div className="dashboard-container todas-os-container">
          {/* Page Header */}
          <div className="todas-os-header">
            <div className="todas-os-title-row">
              <BsListUl className="title-icon-list" />
              <h1>Todas as Ordens de Serviço</h1>
            </div>

            {/* Barra de pesquisa + botão Nova OS */}
            <div className="todas-os-toolbar">
              <div className="todas-search-box">
                <FiSearch className="search-icon-inner" />
                <input
                  type="text"
                  placeholder="Buscar por OS, cliente, equipamento ou analista..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <Link to="/nova-os" style={{ textDecoration: 'none' }}>
                <button className="btn-nova-os">
                  <FiPlusCircle />
                  Nova OS
                </button>
              </Link>
            </div>
          </div>

          {/* Filtros de Status */}
          <div className="status-filters">
            <FiFilter className="filter-label-icon" />
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                className={`status-filter-tab ${statusFilter === s ? 'active' : ''}`}
                onClick={() => handleStatusFilter(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Card da Tabela */}
          <div className="todas-table-card">
            <div className="todas-table-header">
              <h2 className="todas-table-title">
                {statusFilter === 'Todos' ? 'Todas as OS' : statusFilter}
              </h2>
              <span className="todas-table-count">{filtered.length} registros encontrados</span>
            </div>

            <div className="todas-table-wrapper">
              <table className="todas-table">
                <thead>
                  <tr>
                    <th>Nº OS</th>
                    <th>Cliente</th>
                    <th>Equipamento</th>
                    <th>Analista</th>
                    <th>Data de Abertura</th>
                    <th>Status</th>
                    <th className="text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length > 0 ? (
                    paginated.map((os) => {
                      const style = STATUS_STYLE[os.status] || { bg: '#f1f5f9', color: '#475569' };
                      return (
                        <tr key={os.idOs} className="todas-row">
                          <td className="os-id-cell">{os.idOs}</td>
                          <td>{os.cliente}</td>
                          <td className="equip-cell">{os.equipamento}</td>
                          <td>{os.analista}</td>
                          <td>{os.dataAbertura}</td>
                          <td>
                            <span
                              className="status-pill"
                              style={{ backgroundColor: style.bg, color: style.color }}
                            >
                              {os.status}
                            </span>
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
                      <td colSpan="7" className="empty-state">
                        Nenhuma OS encontrada para os filtros aplicados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginação */}
            <div className="todas-table-footer">
              <span className="pagination-info-text">
                Página {currentPage} de {totalPages || 1} · {filtered.length} registros
              </span>
              <div className="pagination-controls">
                <button
                  className="page-btn"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <FiChevronLeft />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    className={`page-btn ${currentPage === n ? 'active' : ''}`}
                    onClick={() => setCurrentPage(n)}
                  >
                    {n}
                  </button>
                ))}
                <button
                  className="page-btn"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TodasOS;
