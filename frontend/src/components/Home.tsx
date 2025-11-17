import React from 'react';
// import '../styles/home.css';

export default function Home() {
    return (
        <>
            <h1>Home</h1>
            <link rel="stylesheet" href="../styles/home.css" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <div className="menu-toggle" id="toggleButton"></div>
            <div className="icone-usuario"></div>
            <div id="notificacao-menu"></div>
        
            <div className="sidebar" id="sidebar">
                <h1>NEXUS</h1>
                <ul>
                    <li>
                        <a href="#">Dashboard</a>
                    </li><br />
                </ul>
            </div>
            <div className="main-buttons">
                    <a href="/transacoes" className="main-button">Transação</a><br /> <br />
                    <a href="/orcamentos" className="main-button">Orçamento</a><br />  <br />
                    <a href="/contas" className="main-button">Contas e Boletos</a><br />  <br />
                    <a href="/graficos" className="main-button">Gráficos</a><br />  <br />
                    <a href="/metas" className="main-button">Metas</a><br />  <br />
                </div>
        </>
    );
}