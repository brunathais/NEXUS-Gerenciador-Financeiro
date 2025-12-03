import { useEffect, useState } from "react";
import "./RelatorioUsuarios.css";

export default function RelatorioUsuarios() {
    const [usuarios, setUsuarios] = useState<Array<{ data: string; total: number }>>([]);

    async function fetchRelatorio() {
        try {
            await fetch('http://localhost:3002/relatorio-usuario/relatorio-usuario')
                .then((response) => response.json())
                .then(data => setUsuarios(data))
                .catch(err => console.error(err));
        } catch (error) {
            console.error('Erro ao buscar relatório de usuários:', error);
        }
    }

    useEffect(() => {
        fetchRelatorio();
    }, []);

    return (
        <div className="container">
            <div className="header">
                <h1>Relatório de Usuários</h1>
                <p className="subtitulo">Veja a evolução do número de usuários por mês.</p>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Mês/Ano</th>
                            <th>Total de Usuários</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((item, index) => (
                            <tr key={index}>
                                <td>{item.data}</td>
                                <td>{item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="actions">
                <button className="botao">Exportar Relatório</button>
            </div>
        </div>
    );
}
