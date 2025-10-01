import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Tipo para os dados da conta
interface Conta {
  nome: string;
  codigoBoleto: string;
  valor: number;
  vencimento: string;
}

export default function ContasBoletos() {
    const [nomeConta, setNomeConta] = useState('');
    const [codigoBoleto, setCodigoBoleto] = useState('');
    const [valorConta, setValorConta] = useState<number>(0);
    const [dataVencimento, setDataVencimento] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);
    const navigate = useNavigate();

    // Função para enviar os dados para a API (ou localStorage, dependendo da implementação)
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMsg(null);
        setLoading(true);
        try {
            // Simulando a gravação no localStorage (ou pode ser adaptado para uma API real)
            const novasContas: Conta[] = JSON.parse(localStorage.getItem('contasFinanceiras') || '[]');
            const novaConta: Conta = { nome: nomeConta, codigoBoleto, valor: valorConta, vencimento: dataVencimento };
            novasContas.push(novaConta);

            localStorage.setItem('contasFinanceiras', JSON.stringify(novasContas));
            
            setMsg('Conta cadastrada com sucesso!');
            setTimeout(() => navigate('/home'), 1000); // Redireciona após 1 segundo (ajuste para sua página de destino)
        } catch (err: any) {
            const errorMsg = err?.response?.data?.message || 'Erro ao cadastrar conta';
            setMsg(errorMsg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="transaction-container">
            <h1>Cadastro de Conta / Boleto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nomeConta">Nome da Conta / Boleto</label>
                    <input
                        id="nomeConta"
                        value={nomeConta}
                        onChange={(e) => setNomeConta(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="codigoBoleto">Código de Barras do Boleto</label>
                    <input
                        id="codigoBoleto"
                        value={codigoBoleto}
                        onChange={(e) => setCodigoBoleto(e.target.value)}
                        required
                        maxLength={50} // Caso seja necessário limitar o número de caracteres
                    />
                </div>
                <div>
                    <label htmlFor="valorConta">Valor (R$)</label>
                    <input
                        id="valorConta"
                        type="number"
                        value={valorConta}
                        onChange={(e) => setValorConta(parseFloat(e.target.value))}
                        step="0.01"
                        min="0"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="dataVencimento">Data de Vencimento</label>
                    <input
                        id="dataVencimento"
                        type="date"
                        value={dataVencimento}
                        onChange={(e) => setDataVencimento(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>
            {msg && <p>{msg}</p>} {/* Exibe mensagem de sucesso ou erro */}
        </div>
    );
}
