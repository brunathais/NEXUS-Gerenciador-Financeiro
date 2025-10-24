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
    // Função de carregamento das contas
    const fetchContas = async () => {
      try {
        const response = await api.get('/contas');
        setContas(response.data);
      } catch (err) {
        console.error('Erro ao listar contas:', err);
      }
    };

    fetchContas();
  }, []);

  async function alterarStatus(id: number, status: 'PENDENTE' | 'PAGO' | 'VENCIDO') {
    try {
      const updatedConta = {
        status,
        dataPagamento: status === 'PAGO' ? new Date().toISOString() : null, // Atribui a data de pagamento somente para o status PAGO
      };
      
      await api.put(`/contas/${id}/status`, updatedConta);

      setContas(prevContas =>
        prevContas.map(conta =>
          conta.id === id
            ? { ...conta, ...updatedConta }  // Atualiza o status e a data de pagamento se for o caso
            : conta
        )
      );
    } catch (err) {
      console.error('Erro ao alterar status da conta:', err);
    }
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
              <>
                <button onClick={() => alterarStatus(conta.id, 'PAGO')}>Marcar como PAGO</button>
                <button onClick={() => alterarStatus(conta.id, 'VENCIDO')}>Marcar como VENCIDO</button>
                <button>editar</button>
                <button>excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
