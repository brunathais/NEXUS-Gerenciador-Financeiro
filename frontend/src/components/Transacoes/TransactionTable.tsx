import { useState } from "react";
import axios from "axios";

interface Transaction {
    id: string;
    tipo: string;
    descricao: string;
    valor: number;
    data: string;
    categoria: string;
}

interface TransactionTableProps {
    transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
    const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);

    const toggleSelectTransaction = (id: string) => {
        setSelectedTransactions((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((transactionId) => transactionId !== id)
                : [...prevSelected, id]
        );
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:8080/transacoes/${id}`);
            // Recarregar a lista
            // loadTransactions();
        } catch (error) {
            console.error("Erro ao excluir transação", error);
        }
    };

    return (
        <table className="tabela">
            <thead>
                <tr>
                    <th>
                        <input
                            type="checkbox"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedTransactions(transactions.map((t) => t.id));
                                } else {
                                    setSelectedTransactions([]);
                                }
                            }}
                            title="Selecionar todas as transações - 01"
                        />
                    </th>
                    <th>Data</th>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>Valor</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedTransactions.includes(transaction.id)}
                                onChange={() => toggleSelectTransaction(transaction.id)}
                                title="Selecionar todas as transações - 02"
                            />
                        </td>
                        <td>{transaction.data}</td>
                        <td>{transaction.descricao}</td>
                        <td>{transaction.categoria}</td>
                        <td>{transaction.valor}</td>
                        <td>
                            <button onClick={() => handleDelete(transaction.id)}>Excluir</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TransactionTable;
