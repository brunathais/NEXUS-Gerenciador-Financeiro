import { Router, Request, Response } from 'express';
import Metas from '../models/Metas';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const { descricao, valor, data } = req.body;

        // Validação dos campos (os campos tipo e descricao são obrigatórios, etc.)
        if (!descricao || !valor || !data) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        const meta = await Metas.create({ descricao, valor, data });

        return res.status(201).json(meta);
    } catch (error) {
        console.error('Erro ao cadastrar transação:', error);
        return res.status(500).json({ message: 'Erro interno ao cadastrar meta' });
    }
});

router.get('/', async (req: Request, res: Response) => { // rota GET /api/metas
    try {
        const metas = await Metas.findAll(); // Busca todas as metas no banco
        return res.status(200).json(metas); // Retorna as metas em formato JSON
    } catch (error) {
        console.error('Erro ao buscar metas:', error);
        return res.status(500).json({ message: 'Erro interno ao buscar metas' });
    }
});

export default router;
