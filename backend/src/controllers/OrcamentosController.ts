import { Router, Request, Response } from 'express';
import Orcamento from '../models/Orcamento';

const router = Router();

// Criar uma nova transação
router.post('/', async (req: Request, res: Response) => {
    try {
        const { descricao, valor, tipo, data } = req.body;
        const orcamento = await Orcamento.create({ descricao, valor, tipo, data });
        return res.status(201).json(orcamento);
    } catch (error) {
        console.error('Erro ao criar transação:', error);
        return res.status(500).json({ message: 'Erro interno ao criar transação' });
    }
});

// Listar todas as transações
router.get('/', async (req: Request, res: Response) => {
    try {
        const orcamentos = await Orcamento.findAll();
        return res.status(200).json(orcamentos);
    } catch (error) {
        console.error('Erro ao listar transações:', error);
        return res.status(500).json({ message: 'Erro interno ao listar transações' });
    }
});

// Buscar uma transação por ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const orcamento = await Orcamento.findByPk(req.params.id);
        if (!orcamento) return res.status(404).json({ message: 'orcamento não encontrada' });
        return res.status(200).json(orcamento);
    } catch (error) {
        console.error('Erro ao buscar orcamento:', error);
        return res.status(500).json({ message: 'Erro interno ao buscar orcamento' });
    }
});

// Atualizar uma transação existente
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { descricao, essenciais, naoEssenciais, imprevistos, poupanca, investimentos } = req.body;
        const orcamento = await Orcamento.findByPk(req.params.id);

        if (!orcamento) return res.status(404).json({ message: 'orcamento não encontrada' });

        orcamento.descricao = descricao;
        orcamento.essenciais = essenciais;
        orcamento.naoEssenciais = naoEssenciais;
        orcamento.imprevistos = imprevistos;
        orcamento.poupanca = poupanca;
        orcamento.investimentos = investimentos;

        await orcamento.save();
        return res.status(200).json(orcamento);
    } catch (error) {
        console.error('Erro ao atualizar orcamento:', error);
        return res.status(500).json({ message: 'Erro interno ao atualizar orcamento' });
    }
});

// Deletar uma transação
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const orcamento = await Orcamento.findByPk(req.params.id);
        if (!orcamento) return res.status(404).json({ message: 'Transação não encontrada' });

        await orcamento.destroy();
        return res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar orcamento:', error);
        return res.status(500).json({ message: 'Erro interno ao deletar orcamento' });
    }
});

export default router;
