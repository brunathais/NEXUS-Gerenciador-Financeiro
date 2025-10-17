import { useState, useEffect } from 'react';
import { api } from '../api';

type Conta = {
  id: number;
  descricao: string;
  valor: number;
  status: 'PENDENTE' | 'PAGO' | 'VENCIDO';
  dataVencimento: string;
  dataPagamento?: string | null;
  observacao?: string;
};

export default function ContaList() {
  const [contas, setContas] = useState<Conta[]>([]);

  useEffect(() => {
    api.get('/contas')
      .then(response => setContas(response.data))
      .catch(err => console.error('Erro ao listar contas:', err));
  }, []);

  async function alterarStatus(id: number, status: 'PENDENTE' | 'PAGO' | 'VENCIDO') {
    await api.put(`/contas/${id}/status`, { status, dataPagamento: status === 'PAGO' ? new Date() : undefined });
    setContas(contas.map(c => (c.id === id ? { ...c, status } : c)));
  }

  return (
    <div>
      <h1>Contas</h1>
      <ul>
        {contas.map(conta => (
          <li key={conta.id}>
            <h3>{conta.descricao}</h3>
            <p>{conta.status} - Vencimento: {new Date(conta.dataVencimento).toLocaleDateString()}</p>
            {conta.status === 'PENDENTE' && (
              <button onClick={() => alterarStatus(conta.id, 'PAGO')}>Marcar como PAGO</button>
            )}
            {conta.status === 'PENDENTE' && (
              <button onClick={() => alterarStatus(conta.id, 'VENCIDO')}>Marcar como VENCIDO</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
