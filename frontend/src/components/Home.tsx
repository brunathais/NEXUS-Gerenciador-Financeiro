import React from "react";
import "../styles/home.css";

export default function Home() {
    return (
        <div className="home-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <h1 className="logo">NEXUS</h1>
                <nav>
                    <ul>
                        <li><a href="#">Dashboard</a></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="header">
                    <h2>Bem-vindo(a)</h2>
                    <div className="user-icon"></div>
                </header>

                <section className="grid">
                    <a href="/transacoes" className="card">
                        <h3>Transações</h3>
                        <p>Gerencie entradas, saídas e controle total do seu dinheiro.</p>
                    </a>

                    <a href="/orcamentos" className="card">
                        <h3>Orçamentos</h3>
                        <p>Crie limites mensais e guie suas decisões financeiras.</p>
                    </a>

                    <a href="/contas" className="card">
                        <h3>Contas e Boletos</h3>
                        <p>Organize seus pagamentos em um só lugar.</p>
                    </a>

                    <a href="/graficos" className="card">
                        <h3>Gráficos</h3>
                        <p>Visualize sua saúde financeira com clareza.</p>
                    </a>

                    <a href="/metas" className="card">
                        <h3>Metas</h3>
                        <p>Planeje sonhos, acompanhe progresso e vença desafios.</p>
                    </a>

                    <a href="/relatorio-usuario" className="card">
                        <h3>Relatório de Usuários</h3>
                        <p>Análises completas para entender o comportamento financeiro.</p>
                    </a>
                </section>
            </main>
        </div>
    );
}
