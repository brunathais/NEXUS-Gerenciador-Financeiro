import React from 'react';
// @ts-ignore: allow importing css without type declarations
import '../styles/sidebar.css';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">NEXUS</h2>
            <ul className="sidebar-menu">
                <li><a href="/home" className="sidebar-link">Home</a></li>
                <li><a href="/transacoes" className="sidebar-link">Transações</a></li>
                <li><a href="/metas" className="sidebar-link">Metas</a></li>
                <li><a href="/orcamentos" className="sidebar-link">Orçamentos</a></li>
            </ul>
            <button className="sidebar-logout">Sair</button>
        </div>
    );
}
