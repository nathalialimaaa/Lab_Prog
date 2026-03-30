import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cadastro.css';

const Cadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    cpf: '',
    email: '',
    telefone: '',
    cidade: '',
    estado: '',
    senha: '',
    confirmaSenha: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getValidationClass = (name) => {
    const value = formData[name];
    if (!value) return ''; // Se estiver vazio, não aplica verde nem vermelho

    if (name === 'email') {
      const isEmail = /\S+@\S+\.\S+/.test(value);
      return isEmail ? 'valid' : 'invalid';
    }
    if (name === 'confirmaSenha') {
      return value === formData.senha && value.length > 0 ? 'valid' : 'invalid';
    }
    if (name === 'senha') {
      return value.length >= 6 ? 'valid' : 'invalid'; // Mínimo 6 chars sugerido
    }
    if (name === 'cpf') {
      return value.length >= 11 ? 'valid' : 'invalid'; // Validação básica visual
    }
    if (name === 'telefone') {
      return value.length >= 10 ? 'valid' : 'invalid';
    }
    
    // Para outros (nome, sobrenome, cidade, estado), se tiver algo digitado, é verde
    return value.length > 2 ? 'valid' : 'invalid'; 
  };

  const handleCadastro = (e) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmaSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    console.log('Dados do Cadastro:', formData);
    alert('Cadastro realizado com sucesso!');
    navigate('/');
  };

  return (
    <div className="cadastro-wrapper">
      <form onSubmit={handleCadastro}>
        <h1>Criar Conta</h1>

        <div className="cadastro-grid">
          <div className="cadastro-input-field">
            <input className={getValidationClass('nome')} type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
          </div>
          
          <div className="cadastro-input-field">
            <input className={getValidationClass('sobrenome')} type="text" name="sobrenome" placeholder="Sobrenome" value={formData.sobrenome} onChange={handleChange} required />
          </div>
          
          <div className="cadastro-input-field">
            <input className={getValidationClass('cpf')} type="text" name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} required />
          </div>
          
          <div className="cadastro-input-field">
            <input className={getValidationClass('telefone')} type="tel" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} required />
          </div>

          <div className="cadastro-input-field full-width">
            <input className={getValidationClass('email')} type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} required />
          </div>
          
          <div className="cadastro-input-field">
            <input className={getValidationClass('cidade')} type="text" name="cidade" placeholder="Cidade" value={formData.cidade} onChange={handleChange} required />
          </div>
          
          <div className="cadastro-input-field">
            <select className={getValidationClass('estado')} name="estado" value={formData.estado} onChange={handleChange} required>
              <option value="" disabled>Estado</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
          </div>

          <div className="cadastro-input-field">
            <input className={getValidationClass('senha')} type="password" name="senha" placeholder="Senha" value={formData.senha} onChange={handleChange} required />
          </div>

          <div className="cadastro-input-field">
            <input className={getValidationClass('confirmaSenha')} type="password" name="confirmaSenha" placeholder="Confirme a Senha" value={formData.confirmaSenha} onChange={handleChange} required />
          </div>
        </div>

        <button type="submit">Cadastrar</button>

        <div className="signup-link">
          <p>
            Já tem uma conta? <Link to="/">Faça Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;
