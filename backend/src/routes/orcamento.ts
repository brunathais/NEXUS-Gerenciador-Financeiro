import { Router, Request, Response } from 'express';
import Orcamentos from '../models/Orcamento';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const { descricao, essenciais, naoEssenciais, poupanca } = req.body;

        // Validação dos campos (os campos tipo e descricao são obrigatórios, etc.)
        if (!descricao || !essenciais || !naoEssenciais || !poupanca) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        const orcamento = await Orcamentos.create({ descricao, essenciais, naoEssenciais, poupanca });

        return res.status(201).json(orcamento);
    } catch (error) {
        console.error('Erro ao cadastrar Orcamentos:', error);
        return res.status(500).json({ message: 'Erro interno ao cadastrar orcamento' });
    }
});

export default router;
