// Hook para gerenciar transações: listagem, criação, edição, exclusão, duplicação e filtros
// Centraliza a lógica de transações para reutilização em vários componentes

import { useCallback, useEffect, useState } from 'react';
import { api } from '../../api';
import { Transacao, Filtros } from './types';

export function useTransactions() {
    const [transacoes, setTransacoes] = useState<Transacao[]>([]); //estado para armazenar as transações buscadas deve ser um array de Transacao
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);
    const [filtros, setFiltros] = useState<Filtros>({
        dataInicio: '', dataFim: '', tipo: '', categoria: ''
    });

    const fetchTransacoes = useCallback(async () => { // useCallback para memorizar a função e evitar recriações desnecessárias, memorizando a função até que os filtros mudem
        setLoading(true);
        try {
            const params: any = {};
            if (filtros.tipo) params.tipo = filtros.tipo; // somente adiciona se tiver valor
            if (filtros.categoria) params.categoria = filtros.categoria;
            if (filtros.dataInicio) params.dataInicio = filtros.dataInicio;
            if (filtros.dataFim) params.dataFim = filtros.dataFim;

            const { data } = await api.get<Transacao[]>('/transacoes', { params }); // espera um array de Transacao da API
            setTransacoes(data);
        } catch (e) {
            setMsg('Erro ao carregar transações');
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [filtros]);

    useEffect(() => { fetchTransacoes(); }, [fetchTransacoes]);

    async function createOrUpdate(t: Omit<Transacao, 'id'>, editingId?: number) { // essa função serve tanto para criar quanto para editar, se tiver editingId é edição
        if (editingId) {
            await api.put(`/transacoes/${editingId}`, t);
            setMsg('Transação atualizada!');
        } else {
            await api.post('/transacoes', t);
            setMsg('Transação criada!');
        }
        await fetchTransacoes();
    }

    async function del(id: number) {
        await api.delete(`/transacoes/${id}`);
        setMsg('Transação excluída!');
        await fetchTransacoes();
    }

    async function duplicate(id: number) {
        await api.post('/transacoes/duplicar', { id });
        setMsg('Transação duplicada!');
        await fetchTransacoes();
    }

    return {
        transacoes, loading, msg, setMsg,
        filtros, setFiltros,
        fetchTransacoes,
        createOrUpdate, del, duplicate
    };
}
