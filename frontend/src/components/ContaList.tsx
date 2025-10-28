import { useState, useEffect } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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

  // Função para alterar status de uma conta
  async function alterarStatus(id: number, status: 'PENDENTE' | 'PAGO' | 'VENCIDO') {
    try {
      const updatedConta = {
        status,
        dataPagamento: status === 'PAGO' ? new Date().toISOString() : null,
      };
      
      await api.put(`/contas/${id}/status`, updatedConta);

      setContas(prevContas =>
        prevContas.map(conta =>
          conta.id === id
            ? { ...conta, ...updatedConta }
            : conta
        )
      );
    } catch (err) {
      console.error('Erro ao alterar status da conta:', err);
    }
  }

  // Função para deletar uma conta com confirmação
  async function deletarConta(id: number) {
    const confirmar = window.confirm("Você tem certeza que deseja excluir esta conta?");
    if (!confirmar) return;

    try {
      await api.delete(`/contas/${id}`);
      setContas(prevContas => prevContas.filter(conta => conta.id !== id));
    } catch (err) {
      console.error('Erro ao excluir conta:', err);
    }
  }

  // Função para editar uma conta
  function editarConta(id: number) {
    navigate(`/contas/editar/${id}`);
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
                <button onClick={() => editarConta(conta.id)}>Editar</button>
                <button onClick={() => deletarConta(conta.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
