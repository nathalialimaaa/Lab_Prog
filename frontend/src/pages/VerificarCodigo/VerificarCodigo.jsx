import React, { useState, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../EsqueciSenha/EsqueciSenha.css'; // Reaproveitando os mesmos estilos glassmorphism
import '../EsqueciSenha/VerificarCodigoStyles.css'; // Os quadradinhos do codigo

const VerificarCodigo = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const emailEnviado = location.state?.email || "seu email";

  const handleChange = (index, value) => {
    // Permite apenas números
    if (isNaN(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus no próximo campo se foi preenchido
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Voltar pro campo anterior ao apagar
    if (e.key === 'Backspace' && index > 0 && code[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerificar = (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      // Simulação do backend conferindo o código, manda para o dashboard por ex (ou nova senha)
      alert('Código ' + fullCode + ' verificado com sucesso!');
      navigate('/');
    } else {
      alert('Por favor, preencha todos os 6 dígitos.');
    }
  };

  return (
    <div className="esqueci-senha-wrapper code-verification">
      <h1>Inserir Código</h1>
      <p>Um código de 6 dígitos foi enviado para <b>{emailEnviado}</b></p>
      
      <form onSubmit={handleVerificar}>
        <div className="codigo-input-container">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
              className={digit ? 'valid-digit' : ''}
              required
            />
          ))}
        </div>
        
        <button type="submit">Autenticar</button>
      </form>
      
      <div className="back-link" style={{ marginTop: '24px' }}>
        <span>Não recebeu? </span>
        <a href="#" onClick={(e) => { e.preventDefault(); alert('Novo código enviado!'); }}>
          Reenviar Código
        </a>
      </div>
      <div className="back-link" style={{ marginTop: '10px' }}>
        <Link to="/esqueci-senha">Voltar</Link>
      </div>
    </div>
  );
};

export default VerificarCodigo;
