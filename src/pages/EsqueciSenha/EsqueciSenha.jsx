import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EsqueciSenha.css';

const EsqueciSenha = () => {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  const handleRecuperar = (e) => {
    e.preventDefault();
    if (getValidationClass() === 'valid') {
      // Simula o envio do e-mail e vai para a proxima tela
      alert('Código de verificação enviado para ' + email);
      navigate('/verificar-codigo', { state: { email } });
    }
  };

  const getValidationClass = () => {
    if (!touched) return '';
    return email.includes('@') && email.includes('.') ? 'valid' : 'invalid';
  };

  return (
    <div className="esqueci-senha-wrapper">
      <h1>Recuperar Senha</h1>
      <p>Digite seu e-mail abaixo e enviaremos um código de segurança.</p>
      
      <form onSubmit={handleRecuperar}>
        <div className="esqueci-input-field">
          <input 
            type="email" 
            placeholder="Seu E-mail Corporativo" 
            value={email} 
            onChange={(e) => {
              setEmail(e.target.value);
              setTouched(true);
            }} 
            className={getValidationClass()}
            required 
          />
        </div>
        
        <button type="submit">Enviar Código</button>
      </form>
      
      <div className="back-link">
        <Link to="/">Voltar para o Login</Link>
      </div>
    </div>
  );
};

export default EsqueciSenha;
