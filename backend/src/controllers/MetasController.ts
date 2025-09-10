import { Router, Request, Response } from 'express';
import Meta from '../models/Metas';

const router = Router();

// Criar uma nova meta
router.post('/', async (req: Request, res: Response) => {
    try {
        const { descricao, valor, data } = req.body;
        const meta = await Meta.create({ descricao, valor, data });
        return res.status(201).json(meta);
    } catch (error) {
        console.error('Erro ao criar meta:', error);
        return res.status(500).json({ message: 'Erro interno ao criar meta' });
    }
});

// Listar todas as transações
router.get('/', async (req: Request, res: Response) => {
    try {
        const metas = await Meta.findAll();
        return res.status(200).json(metas);
    } catch (error) {
        console.error('Erro ao listar transações:', error);
        return res.status(500).json({ message: 'Erro interno ao listar transações' });
    }
});

// Buscar uma meta por ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const meta = await Meta.findByPk(req.params.id);
        if (!meta) return res.status(404).json({ message: 'meta não encontrada' });
        return res.status(200).json(meta);
    } catch (error) {
        console.error('Erro ao buscar meta:', error);
        return res.status(500).json({ message: 'Erro interno ao buscar meta' });
    }
});

// Atualizar uma meta existente
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { descricao, valor, data } = req.body;
        const meta = await Meta.findByPk(req.params.id);

        if (!meta) return res.status(404).json({ message: 'meta não encontrada' });

        meta.descricao = descricao;
        meta.valor = valor;
        meta.data = data;

        await meta.save();
        return res.status(200).json(meta);
    } catch (error) {
        console.error('Erro ao atualizar meta:', error);
        return res.status(500).json({ message: 'Erro interno ao atualizar meta' });
    }
});

// Deletar uma meta
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const meta = await Meta.findByPk(req.params.id);
        if (!meta) return res.status(404).json({ message: 'meta não encontrada' });

        await meta.destroy();
        return res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar meta:', error);
        return res.status(500).json({ message: 'Erro interno ao deletar meta' });
    }
});

export default router;
