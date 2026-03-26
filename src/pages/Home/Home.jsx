import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h2>Bem-vindo à Home Page!</h2>
      <p>Você está logado no sistema.</p>
      <div className="botoes-home">
        <Link to="/" className="btn-sair">Sair</Link>
      </div>
    </div>
  );
};

export default Home;
