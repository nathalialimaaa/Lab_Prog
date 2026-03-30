import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import {
  FiGrid, FiPackage, FiPlusCircle, FiList, FiFileText, FiDollarSign, FiUsers,
  FiBriefcase, FiLogOut, FiMoon, FiBell, FiSettings, FiArrowLeft, FiEdit, FiPrinter,
  FiHardDrive, FiUser, FiTool, FiActivity, FiClock
} from 'react-icons/fi';
import './DetalhesOS.css';
import '../Home/Home.css'; // Herdando Sidebar Padrão

const DetalhesOS = () => {
  const { logout } = useContext(AuthContext);
  const { id } = useParams(); // Para o Backend Puxar a OS certa ex: /os/OS-656
  const navigate = useNavigate();

  // Dados Mockados da OS (Estado Inicial)
  const [osData, setOsData] = useState(null);

  const user = {
    name: "Brenda Proença",
    role: "Suporte Técnico",
    avatar: "B"
  };

  /* 
   * ==========================================
   * INTRUÇÕES PARA O DEV JAVA (BACKEND) E BANCO DE DADOS
   * ==========================================
   *
   * O frontend espera um objeto detalhado (Ex: OrdemServicoDetalhesDTO) vindo da API: GET /api/ordens-servico/{id}
   * Estruture as tabelas (Cliente, Equipamento, Historico) com relacionamentos ManyToOne e OneToMany.
   * Ao acessar esta rota, envie um JSON neste molde abaixo:
   */
  useEffect(() => {
    // Simulação do JSON retornado pelo Banco de Dados / Backend Spring Boot para esta view exata
    const mockDatabaseResponse = {
      numeroOs: id || "OS-656",
      dataAbertura: "17/03/2026",
      horaAbertura: "17:25",
      criadoPor: "Pedro Henrique",
      equipamento: {
        tipo: "Impressora",
        marca: "Brother",
        modelo: "5652",
        numeroSerie: "sn"
      },
      cliente: {
        empresa: "L2 Agronegócios",
        contato: "Danilo",
        email: "N/A",
        telefone: "N/A"
      },
      problemaRelatado: "Esta com a pelicula rasgada.",
      statusAtual: {
        nome: "Aberta",
        cor: "red", // Enum no backend: RED, YELLOW, GREEN... mapeado aqui
        tempoUsado: "14h",
        tempoTotal: "1d",
        porcentagem: "61%",
        restante: "Restam 9h"
      },
      historico: [
        {
          idAgendamento: 1,
          data: "17/03/26",
          hora: "17:25",
          statusNome: "Aberta",
          statusCor: "red",
          usuario: "Pedro Henrique",
          notaDetalhe: "Ordem de serviço criada."
        }
      ]
    };

    // Simulando o delay do servidor
    setTimeout(() => setOsData(mockDatabaseResponse), 300);
  }, [id]);

  if (!osData) {
    return <div className="loading-state">Carregando detalhes da OS...</div>; // Skeleton loading screen placeholder
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar - Menu Lateral (Reutilizada e Mantida Padrão) */}
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
              <li className="menu-item"><FiGrid className="menu-icon" /><span>Dashboard</span></li>
            </Link>
            <Link to="/prontas-entrega" style={{ textDecoration: 'none' }}>
              <li className="menu-item"><FiPackage className="menu-icon" /><span>Prontas p/ Entrega</span></li>
            </Link>
            <Link to="/nova-os" style={{ textDecoration: 'none' }}>
              <li className="menu-item"><FiPlusCircle className="menu-icon" /><span>Nova OS</span></li>
            </Link>
            <li className="menu-item active"><FiList className="menu-icon" /><span>Todas as OS</span></li>
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
            <FiMoon className="footer-icon" />
            <button onClick={logout} className="logout-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <FiLogOut className="footer-icon" />
            </button>
          </div>
        </div>
      </aside>

      {/* Area Principal Responsiva da OS */}
      <main className="main-content" style={{ backgroundColor: '#f1f5f9' }}>
        
        {/* Header do Sistema */}
        <header className="top-header">
          <div className="search-bar-mock">
            <div className="url-mock">
              <span className="lock-icon">🔒</span> controleos.tsmit.com.br/os/{osData.numeroOs.toLowerCase()}
            </div>
          </div>
          <div className="header-actions">
            <FiBell className="action-icon" />
            <FiSettings className="action-icon" />
          </div>
        </header>

        <div className="dashboard-container detalhes-os-container">
          
          {/* Header Específico da OS */}
          <div className="detalhes-header-row">
            <div className="detalhes-header-left">
              <button className="btn-voltar" onClick={() => navigate(-1)}>
                <FiArrowLeft />
              </button>
              <div className="os-title-info">
                <h1>{osData.numeroOs}</h1>
                <p>Aberta em {osData.dataAbertura} as {osData.horaAbertura} por {osData.criadoPor}</p>
              </div>
            </div>
            
            <div className="detalhes-header-right">
              <button className="btn-action-outline">
                <FiEdit /> Editar
              </button>
              <button className="btn-action-outline">
                <FiPrinter /> Imprimir
              </button>
            </div>
          </div>

          {/* Grid de Conteúdo Dividido em 2 Colunas Massonry (Left 65% / Right 35%) */}
          <div className="detalhes-grid-wrapper">
            
            {/* COLUNA ESQUERDA (Dados Maiores) */}
            <div className="detalhes-col-left">
              
              {/* Card 1: Equipamento */}
              <div className="info-card">
                <div className="card-header-styled">
                  <FiHardDrive className="card-icon" />
                  <h2>Equipamento</h2>
                </div>
                <div className="card-grid-2x2">
                  <div className="info-block">
                    <span className="info-label">Tipo</span>
                    <span className="info-value">{osData.equipamento.tipo}</span>
                  </div>
                  <div className="info-block">
                    <span className="info-label">Marca</span>
                    <span className="info-value">{osData.equipamento.marca}</span>
                  </div>
                  <div className="info-block">
                    <span className="info-label">Modelo</span>
                    <span className="info-value">{osData.equipamento.modelo}</span>
                  </div>
                  <div className="info-block">
                    <span className="info-label">N/S</span>
                    <span className="info-value">{osData.equipamento.numeroSerie}</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Cliente e Contato */}
              <div className="info-card">
                <div className="card-header-styled">
                  <FiUser className="card-icon" />
                  <h2>Cliente e Contato</h2>
                </div>
                <div className="card-grid-2x2">
                  <div className="info-block">
                    <span className="info-label">Empresa</span>
                    <span className="info-value">{osData.cliente.empresa}</span>
                  </div>
                  <div className="info-block">
                    <span className="info-label">Contato</span>
                    <span className="info-value">{osData.cliente.contato}</span>
                  </div>
                  <div className="info-block">
                    <span className="info-label">Email</span>
                    <span className="info-value">{osData.cliente.email}</span>
                  </div>
                  <div className="info-block">
                    <span className="info-label">Telefone</span>
                    <span className="info-value">{osData.cliente.telefone}</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Problema Relatado */}
              <div className="info-card">
                <div className="card-header-styled">
                  <FiFileText className="card-icon" />
                  <h2>Problema Relatado</h2>
                </div>
                <div className="info-block full-width">
                  <span className="info-value-text">{osData.problemaRelatado}</span>
                </div>
              </div>

              {/* Card 4: Atualização da OS (Post para o Backend) */}
              <div className="info-card">
                <div className="card-header-styled">
                  <FiTool className="card-icon" />
                  <h2>Atualização da OS</h2>
                </div>
                <p className="card-subtitle">Altere o status ou adicione uma nota/solução técnica.</p>
                
                <form className="atualizacao-form">
                  <div className="form-group-os">
                    <label>Alterar Status para:</label>
                    <select className="select-os">
                      <option>-- {osData.statusAtual.nome} (Atual) --</option>
                      <option>Em Andamento</option>
                      <option>Aguardando Peça</option>
                      <option>Concluído</option>
                    </select>
                  </div>
                  
                  <div className="form-group-os">
                    <label>Nota</label>
                    <textarea 
                      className="textarea-os" 
                      placeholder="Adicione uma nota (opcional)."
                      rows="3"
                    ></textarea>
                  </div>
                  
                  {/* Botão de Envio (Aparece ao preencher no sistema real) */}
                  {/* <button type="submit" className="btn-primary mt-2">Salvar Atualização</button> */}
                </form>
              </div>
            </div>

            {/* COLUNA DIREITA (Widgets / Histórico / Status) */}
            <div className="detalhes-col-right">
              
              {/* Widget 1: Status Atual */}
              <div className="info-card side-widget">
                <div className="widget-header-flex">
                  <div className="card-header-styled mb-0">
                    <FiActivity className="card-icon" />
                    <h2>Status Atual</h2>
                  </div>
                  <span className={`pill-badge badge-${osData.statusAtual.cor}`}>
                    {osData.statusAtual.nome}
                  </span>
                </div>
                
                <div className="progress-section">
                  <div className="progress-labels-top">
                    <span>Tempo no Status</span>
                    <span className="time-highlight">{osData.statusAtual.tempoUsado} / <span className="text-secondary">{osData.statusAtual.tempoTotal}</span></span>
                  </div>
                  
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill bar-yellow" style={{width: osData.statusAtual.porcentagem}}></div>
                  </div>
                  
                  <div className="progress-labels-bottom">
                    <span>{osData.statusAtual.porcentagem}</span>
                    <span>{osData.statusAtual.restante}</span>
                  </div>
                </div>
              </div>

              {/* Widget 2: Histórico */}
              <div className="info-card side-widget">
                <div className="widget-header-flex">
                  <div className="card-header-styled mb-0">
                    <FiClock className="card-icon" />
                    <h2>Histórico de Status</h2>
                  </div>
                  <span className="historico-count">{osData.historico.length} registro{osData.historico.length !== 1 ? 's' : ''}</span>
                </div>
                
                <div className="timeline-container">
                  {osData.historico.map((hist) => (
                    <div className="timeline-item" key={hist.idAgendamento}>
                      <div className="timeline-left-meta">
                        <div className="tl-date">{hist.data}</div>
                        <div className="tl-time">{hist.hora}</div>
                      </div>
                      
                      <div className="timeline-content">
                        <div className="tl-header">
                          <span className={`pill-badge badge-${hist.statusCor}`}>{hist.statusNome}</span>
                          <span className="tl-author">por: {hist.usuario}</span>
                        </div>
                        <div className="tl-message-box">
                          {hist.notaDetalhe}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetalhesOS;
