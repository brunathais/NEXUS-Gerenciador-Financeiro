import { useEffect, useState } from 'react';
import { api } from '../../api';
import MetaCard from './MetaCard';
import MetaForm from './MetasForm';


type Progresso = { totalPoupado: number; valorAlvo: number; porcentagem: number; falta: number; };
type Meta = {
    id: number; nome: string; categoria: string; valorAlvo: number; dataAlvo?: string | null;
    prioridade: string; flexibilidade: string; contribuicaoMensal: number; permiteDepositosExtras: boolean;
    tipoRecorrencia: string; visibilidade: string;
    progresso: Progresso;
};


export default function MetasPage() {
    const [metas, setMetas] = useState<Meta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        async function fetchMetas() {
            try {
                const response = await api.get('/metas');
                setMetas(response.data);
            } catch (err: any) {
                setError('Erro ao carregar as metas.');
            } finally {
                setLoading(false);
            }
        }


        fetchMetas();
    }, []);


    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;


    return (
        <div className="metas-page">

            <MetaForm />
            <h1>Metas</h1>
            <div className="metas-list">
                {metas.map(meta => (
                    <MetaCard key={meta.id} meta={meta} onChanged={() => setMetas(metas)} />
                ))}
            </div>
        </div>
    );
}