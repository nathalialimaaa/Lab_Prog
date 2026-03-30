import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import {
  FiGrid, FiPackage, FiPlusCircle, FiList, FiFileText, FiDollarSign, FiUsers,
  FiBriefcase, FiLogOut, FiMoon, FiSun, FiBell, FiSettings, FiSearch,
  FiFilter, FiChevronLeft, FiChevronRight, FiX, FiCheck, FiClock,
  FiAlertCircle, FiEye, FiDownload, FiSend, FiTool
} from 'react-icons/fi';
import '../Home/Home.css';
import './Orcamento.css';

const mockOrcamentos = [
  {
    id: 'ORC-048', idOs: 'OS-641', cliente: 'ABC Corp',
    equipamento: 'Servidor Dell PowerEdge T30', analista: 'Ana Silva',
    dataCriacao: '22/03/2026', dataValidade: '05/04/2026',
    status: 'Aguardando Aprovação',
    itens: [
      { desc: 'Mão de obra - Diagnóstico e substituição de HD', qtd: 1, unit: 250.00 },
      { desc: 'HD SSD 480GB Kingston', qtd: 1, unit: 320.00 },
      { desc: 'Cabo SATA', qtd: 2, unit: 15.00 },
    ],
    observacao: 'HD com falha crítica. Recomendamos substituição imediata para evitar perda de dados.'
  },
  {
    id: 'ORC-047', idOs: 'OS-638', cliente: 'L2 Agronegócios',
    equipamento: 'Impressora Brother 7535', analista: 'Carla Souza',
    dataCriacao: '20/03/2026', dataValidade: '03/04/2026',
    status: 'Aprovado',
    itens: [
      { desc: 'Mão de obra - Limpeza e manutenção preventiva', qtd: 1, unit: 120.00 },
      { desc: 'Kit de Cilindro e Toner Brother TN-1060', qtd: 1, unit: 185.00 },
    ],
    observacao: 'Impressora com cilindro desgastado e toner vazio. Manutenção preventiva inclusa.'
  },
  {
    id: 'ORC-046', idOs: 'OS-635', cliente: 'Colibri',
    equipamento: 'Monitor Samsung 32"', analista: 'Diego Ferreira',
    dataCriacao: '18/03/2026', dataValidade: '01/04/2026',
    status: 'Recusado',
    itens: [
      { desc: 'Mão de obra - Substituição de placa de vídeo interna', qtd: 1, unit: 200.00 },
      { desc: 'Placa controladora Samsung (importação)', qtd: 1, unit: 580.00 },
    ],
    observacao: 'Peça de difícil aquisição. Prazo estimado de entrega: 15 dias úteis.'
  },
  {
    id: 'ORC-045', idOs: 'OS-642', cliente: 'HsPrates',
    equipamento: 'Monitor LG 24MK430', analista: 'Carla Souza',
    dataCriacao: '15/03/2026', dataValidade: '29/03/2026',
    status: 'Vencido',
    itens: [
      { desc: 'Mão de obra - Troca de capacitores', qtd: 1, unit: 90.00 },
      { desc: 'Kit de capacitores', qtd: 1, unit: 35.00 },
    ],
    observacao: 'Problema na fonte interna do monitor. Reparo simples e rápido.'
  },
  {
    id: 'ORC-044', idOs: 'OS-636', cliente: 'HortVida',
    equipamento: 'Desktop Dell OptiPlex 3080', analista: 'Bruno Melo',
    dataCriacao: '12/03/2026', dataValidade: '26/03/2026',
    status: 'Aprovado',
    itens: [
      { desc: 'Mão de obra - Formatação e reinstalação de SO', qtd: 1, unit: 150.00 },
      { desc: 'Licença Windows 11 Pro', qtd: 1, unit: 580.00 },
      { desc: 'Memória RAM 8GB DDR4', qtd: 1, unit: 210.00 },
    ],
    observacao: 'Computador com SO corrompido e memória RAM com defeito.'
  },
  {
    id: 'ORC-043', idOs: 'OS-634', cliente: 'HsPrates',
    equipamento: 'Notebook HP Pavilion 14', analista: 'Ana Silva',
    dataCriacao: '10/03/2026', dataValidade: '24/03/2026',
    status: 'Aprovado',
    itens: [
      { desc: 'Mão de obra - Troca de tela', qtd: 1, unit: 180.00 },
      { desc: 'Tela LCD 14" HP Pavilion', qtd: 1, unit: 420.00 },
    ],
    observacao: 'Tela com rachado físico. Substituição completa necessária.'
  },
];

const STATUS_OPTIONS = ['Todos', 'Aguardando Aprovação', 'Aprovado', 'Recusado', 'Vencido'];

const STATUS_STYLE = {
  'Aguardando Aprovação': { bg: '#fef9c3', color: '#854d0e', dot: '#eab308' },
  'Aprovado':             { bg: '#dcfce7', color: '#166534', dot: '#16a34a' },
  'Recusado':             { bg: '#fee2e2', color: '#991b1b', dot: '#dc2626' },
  'Vencido':              { bg: '#f1f5f9', color: '#475569', dot: '#94a3b8' },
};

const ITEMS_PER_PAGE = 8;

const calcTotal = (itens) =>
  itens.reduce((acc, i) => acc + i.qtd * i.unit, 0);

const formatCurrency = (val) =>
  val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const SidebarLink = ({ to, icon: Icon, label, active }) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <li className={`menu-item ${active ? 'active' : ''}`}>
      <Icon className="menu-icon" />
      <span>{label}</span>
    </li>
  </Link>
);

const Orcamento = () => {
  const { logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();

  const user = { name: 'Nome do Usuário', role: 'Função', avatar: 'U' };

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOrc, setModalOrc] = useState(null);

  const filtered = mockOrcamentos.filter((o) => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      o.id.toLowerCase().includes(q) ||
      o.cliente.toLowerCase().includes(q) ||
      o.equipamento.toLowerCase().includes(q) ||
      o.idOs.toLowerCase().includes(q) ||
      o.analista.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'Todos' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilter = (s) => { setStatusFilter(s); setCurrentPage(1); };
  const handleSearch = (e) => { setSearchTerm(e.target.value); setCurrentPage(1); };

  const counts = STATUS_OPTIONS.slice(1).reduce((acc, s) => {
    acc[s] = mockOrcamentos.filter((o) => o.status === s).length;
    return acc;
  }, {});

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
            <SidebarLink to="/home"           icon={FiGrid}      label="Dashboard" />
            <SidebarLink to="/prontas-entrega" icon={FiPackage}   label="Prontas para Entrega" />
            <SidebarLink to="/nova-os"         icon={FiPlusCircle} label="Nova OS" />
            <SidebarLink to="/todas-os"        icon={FiList}      label="Todas as OS" />
            <SidebarLink to="/orcamentos"      icon={FiFileText}  label="Orçamentos" active />
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
            <div className="user-avatar">{user.avatar}</div>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role}</span>
            </div>
          </div>
          <div className="theme-logout">
            <button onClick={toggleTheme} className="theme-toggle-btn"
              title={isDark ? 'Modo claro' : 'Modo escuro'}>
              {isDark ? <FiSun className="footer-icon" /> : <FiMoon className="footer-icon" />}
            </button>
            <button onClick={logout} className="logout-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <FiLogOut className="footer-icon" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="main-content">
        <header className="top-header">
          <div className="search-bar-mock">
            <div className="url-mock">
              <span>🔒</span> IntegraOS.com.br/orcamentos
            </div>
          </div>
          <div className="header-actions">
            <FiBell className="action-icon" />
            <FiSettings className="action-icon" />
          </div>
        </header>

        <div className="dashboard-container orc-container">
          {/* Cabeçalho */}
          <div className="orc-page-header">
            <div className="orc-title-row">
              <FiFileText className="orc-title-icon" />
              <div>
                <h1>Orçamentos</h1>
                <p className="orc-subtitle">Gerencie e acompanhe todos os orçamentos emitidos</p>
              </div>
            </div>
            <button className="btn-novo-orc">
              <FiPlusCircle /> Novo Orçamento
            </button>
          </div>

          {/* Cards de resumo */}
          <div className="orc-summary-grid">
            {STATUS_OPTIONS.slice(1).map((s) => {
              const st = STATUS_STYLE[s];
              return (
                <div key={s} className="orc-summary-card" onClick={() => handleFilter(s)}
                  style={{ cursor: 'pointer', outline: statusFilter === s ? `2px solid ${st.dot}` : 'none' }}>
                  <div className="orc-summary-dot" style={{ backgroundColor: st.dot }} />
                  <div>
                    <div className="orc-summary-count">{counts[s]}</div>
                    <div className="orc-summary-label">{s}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Toolbar */}
          <div className="orc-toolbar">
            <div className="orc-search-box">
              <FiSearch className="orc-search-icon" />
              <input
                type="text"
                placeholder="Buscar por nº orçamento, OS, cliente, analista..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="orc-filter-tabs">
              <FiFilter style={{ color: 'var(--text-muted)', fontSize: 14 }} />
              {STATUS_OPTIONS.map((s) => (
                <button key={s}
                  className={`orc-filter-tab ${statusFilter === s ? 'active' : ''}`}
                  onClick={() => handleFilter(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Tabela */}
          <div className="orc-table-card">
            <div className="orc-table-header">
              <span className="orc-table-title">
                {statusFilter === 'Todos' ? 'Todos os Orçamentos' : statusFilter}
              </span>
              <span className="orc-table-count">{filtered.length} registro{filtered.length !== 1 ? 's' : ''}</span>
            </div>

            <div className="orc-table-wrapper">
              <table className="orc-table">
                <thead>
                  <tr>
                    <th>Nº Orçamento</th>
                    <th>OS Vinculada</th>
                    <th>Cliente</th>
                    <th>Equipamento</th>
                    <th>Analista</th>
                    <th>Data</th>
                    <th>Validade</th>
                    <th className="text-right">Total</th>
                    <th>Status</th>
                    <th className="text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length > 0 ? paginated.map((o) => {
                    const st = STATUS_STYLE[o.status] || STATUS_STYLE['Vencido'];
                    return (
                      <tr key={o.id} className="orc-row">
                        <td className="orc-id-cell">{o.id}</td>
                        <td>
                          <Link to={`/os/${o.idOs}`} className="orc-os-link">{o.idOs}</Link>
                        </td>
                        <td>{o.cliente}</td>
                        <td className="orc-equip-cell">{o.equipamento}</td>
                        <td>{o.analista}</td>
                        <td className="orc-date-cell">{o.dataCriacao}</td>
                        <td className="orc-date-cell">{o.dataValidade}</td>
                        <td className="text-right orc-total-cell">{formatCurrency(calcTotal(o.itens))}</td>
                        <td>
                          <span className="orc-status-pill"
                            style={{ backgroundColor: st.bg, color: st.color }}>
                            <span className="orc-status-dot" style={{ backgroundColor: st.dot }} />
                            {o.status}
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="orc-actions">
                            <button className="orc-btn-icon" title="Ver detalhes"
                              onClick={() => setModalOrc(o)}>
                              <FiEye />
                            </button>
                            <button className="orc-btn-icon" title="Enviar ao cliente">
                              <FiSend />
                            </button>
                            <button className="orc-btn-icon" title="Baixar PDF">
                              <FiDownload />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan={10} className="orc-empty">
                        Nenhum orçamento encontrado para os filtros aplicados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginação */}
            <div className="orc-table-footer">
              <span className="orc-pagination-info">
                Página {currentPage} de {totalPages} · {filtered.length} registros
              </span>
              <div className="orc-pagination-controls">
                <button className="orc-page-btn"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}>
                  <FiChevronLeft />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button key={n}
                    className={`orc-page-btn ${currentPage === n ? 'active' : ''}`}
                    onClick={() => setCurrentPage(n)}>
                    {n}
                  </button>
                ))}
                <button className="orc-page-btn"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}>
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Detalhes */}
      {modalOrc && (
        <div className="orc-modal-overlay" onClick={() => setModalOrc(null)}>
          <div className="orc-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header do modal */}
            <div className="orc-modal-header">
              <div className="orc-modal-title-block">
                <div className="orc-modal-badge">
                  <FiFileText />
                </div>
                <div>
                  <h2>{modalOrc.id}</h2>
                  <p>Vinculado à <Link to={`/os/${modalOrc.idOs}`} className="orc-os-link">{modalOrc.idOs}</Link> · {modalOrc.cliente}</p>
                </div>
              </div>
              <button className="orc-modal-close" onClick={() => setModalOrc(null)}>
                <FiX />
              </button>
            </div>

            {/* Info grid */}
            <div className="orc-modal-info-grid">
              <div className="orc-modal-info-item">
                <span className="orc-modal-info-label">Equipamento</span>
                <span className="orc-modal-info-val"><FiTool style={{ marginRight: 6 }} />{modalOrc.equipamento}</span>
              </div>
              <div className="orc-modal-info-item">
                <span className="orc-modal-info-label">Analista Responsável</span>
                <span className="orc-modal-info-val">{modalOrc.analista}</span>
              </div>
              <div className="orc-modal-info-item">
                <span className="orc-modal-info-label">Data de Criação</span>
                <span className="orc-modal-info-val"><FiClock style={{ marginRight: 6 }} />{modalOrc.dataCriacao}</span>
              </div>
              <div className="orc-modal-info-item">
                <span className="orc-modal-info-label">Válido até</span>
                <span className="orc-modal-info-val"><FiAlertCircle style={{ marginRight: 6, color: '#eab308' }} />{modalOrc.dataValidade}</span>
              </div>
            </div>

            {/* Tabela de itens */}
            <div className="orc-modal-items-title">Itens do Orçamento</div>
            <table className="orc-modal-items-table">
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th className="text-center">Qtd</th>
                  <th className="text-right">Valor Unit.</th>
                  <th className="text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {modalOrc.itens.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.desc}</td>
                    <td className="text-center">{item.qtd}</td>
                    <td className="text-right">{formatCurrency(item.unit)}</td>
                    <td className="text-right orc-subtotal">{formatCurrency(item.qtd * item.unit)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="orc-total-label">Total Geral</td>
                  <td className="text-right orc-grand-total">{formatCurrency(calcTotal(modalOrc.itens))}</td>
                </tr>
              </tfoot>
            </table>

            {/* Observação */}
            {modalOrc.observacao && (
              <div className="orc-modal-obs">
                <span className="orc-modal-obs-label">Observações</span>
                <p>{modalOrc.observacao}</p>
              </div>
            )}

            {/* Ações do modal */}
            <div className="orc-modal-actions">
              {modalOrc.status === 'Aguardando Aprovação' && (
                <>
                  <button className="orc-modal-btn orc-modal-btn-approve">
                    <FiCheck /> Aprovar
                  </button>
                  <button className="orc-modal-btn orc-modal-btn-reject">
                    <FiX /> Recusar
                  </button>
                </>
              )}
              <button className="orc-modal-btn orc-modal-btn-send">
                <FiSend /> Enviar ao Cliente
              </button>
              <button className="orc-modal-btn orc-modal-btn-download">
                <FiDownload /> Baixar PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orcamento;
