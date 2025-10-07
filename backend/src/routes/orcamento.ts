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

        const { descricao, essenciais, naoEssenciais, imprevistos, poupanca, investimentos } = req.body;

        // Validação dos campos
        if (!descricao || essenciais === undefined || naoEssenciais === undefined || imprevistos === undefined || poupanca === undefined || investimentos === undefined) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios arquivo routes' });
        }

        // Cria o orçamento no banco
        const orcamento = await Orcamento.create({ descricao, essenciais, naoEssenciais, imprevistos, poupanca, investimentos });
        return res.status(201).json(orcamento); // Retorna o orçamento criado
    } catch (error) {
        console.error('Erro ao cadastrar orçamento:', error);
        return res.status(500).json({ message: 'Erro interno ao cadastrar orçamento arquivo routes' });

    }
});

// Rota para somar transações por categoria
router.get('/orcamento/:orcamentoId/soma', async (req: Request, res: Response) => {
    try {
        const { orcamentoId } = req.params;
        const { categoria } = req.query; // Passando categoria pela query string

        // Buscar as transações do orçamento filtradas pela categoria
        const transacoes = await Transacao.findAll({
            where: { orcamentoId, categoria },
        });

        const somaTransacoes = transacoes.reduce((total, transacao) => total + transacao.valor, 0);

        // Agora, buscamos o orçamento para pegar o limite da categoria
        const orcamento = await Orcamento.findByPk(orcamentoId);
        if (!orcamento) return res.status(404).json({ message: 'Orçamento não encontrado' });

        const limiteCategoria = orcamento[categoria]; // Essenciais, naoEssenciais, etc.

        // Verifica se ultrapassou o limite
        if (somaTransacoes >= limiteCategoria) {
            return res.status(200).json({
                alerta: 'Limite da categoria ultrapassado',
                valor: somaTransacoes,
                limite: limiteCategoria
            });
        }

        // Retorna a soma das transações
        return res.status(200).json({ somaTransacoes, limiteCategoria });
    } catch (error) {
        console.error('Erro ao somar transações:', error);
        return res.status(500).json({ message: 'Erro interno ao somar transações' });
    }
});

/*
// Verificar se o valor das transações está perto do limite
if (somaTransacoes >= limiteCategoria * 0.9) {
    return res.status(200).json({
        alerta: 'Limite da categoria está perto de ser ultrapassado',
        valor: somaTransacoes,
        limite: limiteCategoria
    });
}

*/

export default router;