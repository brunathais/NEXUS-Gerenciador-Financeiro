import React from 'react';
import '../styles/home.css';

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
                    <a href="../transacoes/transacoes.html" className="main-button">Transação</a><br /> <br />
                    <a href="../educacaoFinanceira/educacaoFinanceira.html" className="main-button">Educação Financeira</a><br /> <br />
                    <a href="../orcamento/orcamento.html" className="main-button">Orçamento</a><br />  <br />
                    <a href="../contas/contas.html" className="main-button">Contas e Boletos</a><br />  <br />
                    <a href="../graficos/graficos.html" className="main-button">Gráficos</a><br />  <br />
                    <a href="../metas/metas.html" className="main-button">Metas</a><br />  <br />
                </div>
        </>
    );
}