import { Router, Request, Response } from 'express';
import Transacao from '../models/Transacao';

const router = Router();

// Criar uma nova transação
router.post('/', async (req: Request, res: Response) => {
    try {
        const { descricao, valor, tipo, data, categoria } = req.body;
        const transacao = await Transacao.create({ descricao, valor, tipo, data, categoria });
        return res.status(201).json(transacao);
    } catch (error) {
        console.error('Erro ao criar transação:', error);
        return res.status(500).json({ message: 'Erro interno ao criar transação' });
    }
});

// Listar todas as transações
router.get('/', async (req: Request, res: Response) => {
    try {
        const transacoes = await Transacao.findAll();
        return res.status(200).json(transacoes);
    } catch (error) {
        console.error('Erro ao listar transações:', error);
        return res.status(500).json({ message: 'Erro interno ao listar transações' });
    }
});

// Buscar uma transação por ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const transacao = await Transacao.findByPk(req.params.id);
        if (!transacao) return res.status(404).json({ message: 'Transação não encontrada' });
        return res.status(200).json(transacao);
    } catch (error) {
        console.error('Erro ao buscar transação:', error);
        return res.status(500).json({ message: 'Erro interno ao buscar transação' });
    }
});

// Atualizar uma transação existente
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { descricao, valor, tipo, data, categoria } = req.body;
        const transacao = await Transacao.findByPk(req.params.id);

        if (!transacao) return res.status(404).json({ message: 'Transação não encontrada' });

        transacao.descricao = descricao;
        transacao.valor = valor;
        transacao.tipo = tipo;
        transacao.data = data;
        transacao.categoria = categoria;

        await transacao.save();
        return res.status(200).json(transacao);
    } catch (error) {
        console.error('Erro ao atualizar transação:', error);
        return res.status(500).json({ message: 'Erro interno ao atualizar transação' });
    }
});

// Deletar uma transação
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const transacao = await Transacao.findByPk(req.params.id);
        if (!transacao) return res.status(404).json({ message: 'Transação não encontrada' });

        await transacao.destroy();
        return res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar transação:', error);
        return res.status(500).json({ message: 'Erro interno ao deletar transação' });
    }
});

export default router;