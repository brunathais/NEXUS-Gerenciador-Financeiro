import { Router, Request, Response } from 'express';
import Orcamento from '../models/Orcamento';

const router = Router();

// Rota para buscar todos os orçamentos
router.get('/', async (req: Request, res: Response) => {
    try {
        const orcamentos = await Orcamento.findAll(); // Busca todos os orçamentos no banco
        return res.status(200).json(orcamentos); // Retorna os orçamentos em formato JSON
    } catch (error) {
        console.error('Erro ao buscar orçamentos:', error);
        return res.status(500).json({ message: 'Erro interno ao buscar orçamentos' });
    }
});

/**
 * POST /api/orcamentos
 * body: { descricao: string, essenciais: number, naoEssenciais: number, poupanca: number, investimentos: number }
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        const { descricao, essenciais, naoEssenciais, poupanca, investimentos } = req.body;

        // Validação dos campos
        if (!descricao || essenciais === undefined || naoEssenciais === undefined || poupanca === undefined || investimentos === undefined) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        // Cria o orçamento no banco
        const orcamento = await Orcamento.create({ descricao, essenciais, naoEssenciais, poupanca, investimentos });
        return res.status(201).json(orcamento); // Retorna o orçamento criado
    } catch (error) {
        console.error('Erro ao cadastrar orçamento:', error);
        return res.status(500).json({ message: 'Erro interno ao cadastrar orçamento' });
    }
});

export default router;

