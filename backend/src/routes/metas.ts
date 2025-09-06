import { Router, Request, Response } from 'express';
import Meta from '../models/Metas';

const router = Router();

/**
 * POST /api/transacoes
 * body: { descricao: string, valorTotal: number, valorInicial: string, data: Date }
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        const { descricao, valorTotal, valorInicial, data } = req.body;

        // Validação dos campos (os campos valorInicial e descricao são obrigatórios, etc.)
        if (!descricao || !valorTotal || !valorInicial || !data) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        // Cria a transação no banco
        const meta = await Meta.create({ descricao, valorTotal, valorInicial, data });

        return res.status(201).json(meta); // Retorna a transação criada
    } catch (error) {
        console.error('Erro ao cadastrar transação:', error);
        return res.status(500).json({ message: 'Erro interno ao cadastrar transação' });
    }
});

export default router;
