import React from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore: allow importing css without type declarations
import '../styles/header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="logo">
                <h1>NEXUS</h1>
            </div>
            <nav className="navbar">
                <Link to="/home">Home</Link>
                <Link to="/transacoes">Transações</Link>
                <Link to="/metas">Metas</Link>
                <Link to="/orcamentos">Orçamentos</Link>
            </nav>
        </header>
    );
}
