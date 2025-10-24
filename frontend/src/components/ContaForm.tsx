import { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
// import "../styles/conta.css";
import ContaList from './ContaList';

export default function ContaForm() {
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState<'PAGAR' | 'RECEBER'>('PAGAR');
  const [valor, setValor] = useState<number | string>('');
  const [dataVencimento, setDataVencimento] = useState('');
  const [observacao, setObservacao] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      await api.post('/contas', { descricao, tipo, valor, dataVencimento, observacao });
      setMsg('Conta cadastrada com sucesso!');
      setTimeout(() => navigate('/contas'), 1000);
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Erro ao cadastrar conta';
      setMsg(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Cadastrar Conta</h1>
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
            onChange={e => setValor(e.target.value)} 
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
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      {msg && <p>{msg}</p>}
      <ContaList />
    </div>
  );
}
