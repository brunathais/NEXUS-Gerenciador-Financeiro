import React from 'react';
// @ts-ignore: side-effect import of CSS without type declarations
import '../styles/home.css';

export default function Home() {
    return (

            <div className="main-content">
                <div className="card">
                    <h2>Transação</h2>
                    <p>Gerencie suas transações de forma simples.</p>
                    <a href="/transacoes" className="btn-action">Acessar</a>
                </div>

                <div className="card">
                    <h2>Educação Financeira</h2>
                    <p>Aprenda a gerenciar suas finanças pessoais.</p>
                    <a href="/educacao-financeira" className="btn-action">Acessar</a>
                </div>

                <div className="card">
                    <h2>Orçamento</h2>
                    <p>Crie orçamentos e acompanhe seus gastos.</p>
                    <a href="/orcamento" className="btn-action">Acessar</a>
                </div>
            </div>
    );
}
