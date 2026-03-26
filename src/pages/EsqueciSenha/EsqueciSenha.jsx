import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './EsqueciSenha.css';

const EsqueciSenha = () => {
  const [email, setEmail] = useState('');

  const handleRecuperar = (e) => {
    e.preventDefault();
    console.log('Recuperar senha para:', email);
  };

  return (
    <div className="recuperar-container">
      <h2>Esqueci a Senha</h2>
      <p>Digite seu email para receber um link de recuperação.</p>
      <form onSubmit={handleRecuperar}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit">Enviar Link</button>
      </form>
      <div className="links">
        <Link to="/">Voltar para o Login</Link>
      </div>
    </div>
  );
};

export default EsqueciSenha;
