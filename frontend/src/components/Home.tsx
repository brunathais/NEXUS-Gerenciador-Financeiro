export default function Home() {
    return (
        <>
            <h1>Home</h1>
            <div className="menu-toggle" id="toggleButton"></div>
            <div className="icone-usuario"></div>
            <div id="notificacao-menu"></div>
            <button id="logout"></button>
            <div className="sidebar" id="sidebar">
                <h2>NEXUS</h2>
                <ul>
                    <li><a href="#">Dashboard</a></li>
                </ul>
            </div>
            <div className="main-buttons">
                    <a href="../transacoes/transacoes.html" className="main-button">Transação</a>
                    <a href="../educacaoFinanceira/educacaoFinanceira.html" className="main-button">Educação Financeira</a>
                    <a href="../orcamento/orcamento.html" className="main-button">Orçamento</a>
                    <a href="../contas/contas.html" className="main-button">Contas e Boletos</a>
                    <a href="../graficos/graficos.html" className="main-button">Gráficos</a>
                    <a href="../metas/metas.html" className="main-button">Metas</a>
                </div>
        </>
    );
}