import { Router, Request, Response } from 'express';
import Transacao from '../models/Transacao';

const router = Router();

/**
 * POST /api/transacoes
 * body: { descricao: string, valor: number, tipo: string, data: Date }
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        const { descricao, valor, tipo, data } = req.body;

        // Validação dos campos (os campos tipo e descricao são obrigatórios, etc.)
        if (!descricao || !valor || !tipo || !data) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        // Cria a transação no banco
        const transacao = await Transacao.create({ descricao, valor, tipo, data });

        return res.status(201).json(transacao); // Retorna a transação criada
    } catch (error) {
        console.error('Erro ao cadastrar transação:', error);
        return res.status(500).json({ message: 'Erro interno ao cadastrar transação' });
    }
});

export default router;
