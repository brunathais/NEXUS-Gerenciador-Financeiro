import { Router, Request, Response } from 'express';
import Transacao from '../models/Transacao';
import Orcamento from '../models/Orcamento';
import sequelize from '../db';

const router = Router();

// Rota para buscar todas as transações
router.get('/', async (req: Request, res: Response) => { // rota GET /api/transacoes
    try {
        const transacoes = await Transacao.findAll(); // Busca todas as transações no banco
        return res.status(200).json(transacoes); // Retorna as transações em formato JSON
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        return res.status(500).json({ message: 'Erro interno ao buscar transações' });
    }
});

router.get('/soma-categoria', async (req: Request, res: Response) => {
    try {
        const somaCategoria = await Transacao.findAll({
            attributes: [
                'categoria',
                [sequelize.fn('SUM', sequelize.col('valor')), 'soma'], //Soma os valores das transações para cada categoria
            ],
            group: ['categoria'], //Agrupa os resultados por categoria, ou seja, calcula a soma para cada categoria separadamente.
            raw: true,
        });

        return res.status(200).json(somaCategoria);
    } catch (error) {
        console.error('erro ao calcular a soma das transações', error);
        return res.status(500).json({ message: 'erro interno ao calcular categorias' })
    };

})

/**
 * POST /api/transacoes
 * body: { descricao: string, valor: number, tipo: string, data: Date }
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        const { descricao, valor, tipo, data, categoria } = req.body;

        // Validação dos campos (os campos tipo e descricao são obrigatórios, etc.)
        if (!descricao || !valor || !tipo || !data || !categoria) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        // Cria a transação no banco
        const transacao = await Transacao.create({ descricao, valor, tipo, data, categoria });

        const orcamento = await Orcamento.findOne();
        if (!orcamento) {
            return res.status(500).json({ message: 'erro ao encontrar orcamento, orcamento não encontrado' })
        }

        let gastoTotal = 0;

        const transacoesCategoria = await Transacao.findAll({
            where: {
                categoria,
                tipo: 'Saída',
            }
        })

        gastoTotal = transacoesCategoria.reduce((total, transacao) => total + transacao.valor, 0);

        let alerta = '';
        if (categoria === 'Essenciais' && gastoTotal > orcamento.essenciais) {
            alerta = 'Limite de orçamento para essenciais ultrapassado!';
        } else if (categoria === 'Não Essenciais' && gastoTotal > orcamento.essenciais) {
            alerta = 'Limite de orçamento para Não Essenciais ultrapassado!';
        } else if (categoria === 'Imprevistos' && gastoTotal > orcamento.essenciais) {
            alerta = 'Limite de orçamento para Imprevistos ultrapassado!';
        }

        return res.status(201).json({
            transacao,
            alerta: alerta || 'transação cadastrada com sucesso!'
        })
        // Retorna a transação criada
    } catch (error) {
        console.error('Erro ao cadastrar transação:', error);
        return res.status(500).json({ message: 'Erro interno ao cadastrar transação' });
    }
});


export default router;