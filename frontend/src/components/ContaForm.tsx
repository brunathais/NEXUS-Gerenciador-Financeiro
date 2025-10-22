import { useState, useEffect } from 'react';
import { api } from '../api';
import ContaList from './ContaList';  // Certifique-se de que o componente ContaList está importado corretamente
import "../styles/conta.css";

type Conta = {
  id: number;
  descricao: string;
  tipo: 'PAGAR' | 'RECEBER';
  valor: number;
  status: 'PENDENTE' | 'PAGO' | 'VENCIDO';
  dataVencimento: string;
  observacao?: string;
};

export default function ContaForm({ contaEdit, onContaCadastrada }: { contaEdit?: Conta, onContaCadastrada?: Function }) {
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState<'PAGAR' | 'RECEBER'>('PAGAR');
  const [valor, setValor] = useState<number>(0);
  const [dataVencimento, setDataVencimento] = useState('');
  const [observacao, setObservacao] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // Preencher os campos com os dados da conta para edição
  useEffect(() => {
    if (contaEdit) {
      setDescricao(contaEdit.descricao);
      setTipo(contaEdit.tipo);
      setValor(contaEdit.valor);
      setDataVencimento(contaEdit.dataVencimento);
      setObservacao(contaEdit.observacao || '');
    }
  }, [contaEdit]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);  // Limpa a mensagem antes de tentar enviar
    setLoading(true);

    try {
      if (contaEdit) {
        // Atualizar conta existente
        await api.put(`/contas/${contaEdit.id}`, { descricao, tipo, valor, dataVencimento, observacao });
        setMsg('Conta atualizada com sucesso!');
      } else {
        // Criar nova conta
        await api.post('/contas', { descricao, tipo, valor, dataVencimento, observacao });
        setMsg('Conta cadastrada com sucesso!');
      }

      // Limpar os campos após o envio
      setDescricao('');
      setTipo('PAGAR');
      setValor(0);
      setDataVencimento('');
      setObservacao('');

      // Atualizar a lista de contas (via callback onContaCadastrada)
      if (onContaCadastrada) {
        onContaCadastrada();  // Chama o callback para atualizar a lista
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Erro ao cadastrar/atualizar conta';
      setMsg(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>{contaEdit ? 'Editar Conta' : 'Cadastrar Conta'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Descrição</label>
          <input 
            value={descricao} 
            onChange={e => setDescricao(e.target.value)} 
            required 
            aria-label="Descrição"
            placeholder="Digite a descrição"
            title="Campo para inserir a descrição da conta"
          />
        </div>
        <div>
          <label>Tipo</label>
          <select 
            value={tipo} 
            onChange={e => setTipo(e.target.value as 'PAGAR' | 'RECEBER')}
            aria-label="Tipo de conta"
          >
            <option value="PAGAR">Pagar</option>
            <option value="RECEBER">Receber</option>
          </select>
        </div>
        <div>
          <label>Valor</label>
          <input 
            type="number" 
            value={valor} 
            onChange={e => setValor(Number(e.target.value))}  // Convertendo para number
            required 
            aria-label="Valor"
            placeholder="Digite o valor"
            title="Campo para inserir o valor da conta"
          />
        </div>
        <div>
          <label htmlFor="dataVencimento">Data de Vencimento</label>
          <input
            id="dataVencimento"
            type="date"
            value={dataVencimento}
            onChange={e => setDataVencimento(e.target.value)}
            required
            aria-label="Data de Vencimento"
            title="Campo para inserir a data de vencimento"
            placeholder="Selecione a data de vencimento"
          />
        </div>
        <div>
          <label>Observação</label>
          <input 
            value={observacao} 
            onChange={e => setObservacao(e.target.value)}
            title="Campo para inserir observações sobre a conta"
            placeholder="Digite uma observação (opcional)"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : contaEdit ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

      {/* Exibir a mensagem de sucesso ou erro */}
      {msg && <p style={{ color: 'green', fontWeight: 'bold' }}>{msg}</p>} 

      {/* Lista de contas cadastradas abaixo do formulário */}
      <ContaList onContaCadastrada={onContaCadastrada} />
    </div>
  );
}
