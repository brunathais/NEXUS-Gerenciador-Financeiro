import { useState } from 'react';
import { api } from '../../api';


type Deposito = { id: number; valor: number; observacao?: string; origem: 'EXTRA' | 'MENSAL'; criadoEm: string; };
type Progresso = { totalPoupado: number; valorAlvo: number; porcentagem: number; falta: number; };
type Meta = {
    id: number; nome: string; categoria: string; valorAlvo: number; dataAlvo?: string | null;
    prioridade: string; flexibilidade: string; contribuicaoMensal: number; permiteDepositosExtras: boolean;
    tipoRecorrencia: string; visibilidade: string;
    progresso: Progresso;
    depositos?: Deposito[]; // se vier pelo detalhe
};


export default function MetaCard({ meta, onChanged }: { meta: Meta; onChanged?: () => void }) {
    const [depositoValor, setDepositoValor] = useState('');
    const [observacao, setObservacao] = useState('');
    const [novaContrib, setNovaContrib] = useState(meta.contribuicaoMensal.toString());
    const [busy, setBusy] = useState(false);


    async function addDeposito() {
        if (!depositoValor) return;
        setBusy(true);
        try {
            await api.post(`/metas/${meta.id}/depositos`, { valor: Number(depositoValor), observacao });
            setDepositoValor(''); setObservacao('');
            onChanged?.();
        } finally { setBusy(false); }
    }


    async function salvarContrib() {
        setBusy(true);
        try {
            await api.patch(`/metas/${meta.id}/contribuicao`, { contribuicaoMensal: Number(novaContrib || 0) });
            onChanged?.();
        } finally { setBusy(false); }
    }


    async function aplicarMensal() {
        setBusy(true);
        try {
            await api.post(`/metas/${meta.id}/aplicar-mensal`);
            onChanged?.();
        } finally { setBusy(false); }
    }


    const p = meta.progresso?.porcentagem ?? 0;


    return (
        <div className="meta-card">
            <div className="header">
                <h3>{meta.nome}</h3>
                <small>{meta.categoria} • {meta.prioridade} • {meta.flexibilidade}</small>
            </div>


            <div className="progress">
                <div className="bar">
                    <div className="fill" style={{ width: `${p}%` }} />
                </div>
                <div className="numbers">
                    <span>{p.toFixed(1)}% atingido</span>
                    <span>falta R$ {meta.progresso?.falta.toFixed(2)}</span>
                </div>
                <div className="totais">
                    <strong>R$ {meta.progresso?.totalPoupado.toFixed(2)}</strong> de R$ {meta.progresso?.valorAlvo.toFixed(2)}
                </div>
            </div>


            <div className="acoes-rapidas">
                <div className="deposito">
                    <input type="number" step="0.01" placeholder="Adicionar valor (R$)" value={depositoValor} onChange={e => setDepositoValor(e.target.value)} />
                    <input placeholder="Observação (opcional)" value={observacao} onChange={e => setObservacao(e.target.value)} />
                    <button onClick={addDeposito} disabled={busy || !depositoValor}>Adicionar</button>
                </div>
                {/* parte de contribuição mensal removida temporariamente por conta de bugs
                <div className="contrib">
                    <label>Contrib. mensal (R$)</label>
                    <input type="number" step="0.01" value={novaContrib} onChange={e => setNovaContrib(e.target.value)} />
                    <button onClick={salvarContrib} disabled={busy}>Salvar</button>
                    <button onClick={aplicarMensal} disabled={busy}>Aplicar este mês</button>
                </div>
                */}


                {meta.dataAlvo && <p>Data-alvo: {new Date(meta.dataAlvo).toLocaleDateString()}</p>}


                {/* Histórico compacto (se vier do detalhe) */}
                {Array.isArray((meta as any).historico) && (
                    <div className="historico">
                        <h4>Últimas movimentações</h4>
                        <ul>
                            {(meta as any).historico.slice(0, 5).map((h: Deposito) => (
                                <li key={h.id}>
                                    <span>{new Date(h.criadoEm).toLocaleDateString()} — R$ {h.valor.toFixed(2)} [{h.origem}]</span>
                                    {h.observacao && <em> • {h.observacao}</em>}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
