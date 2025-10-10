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
            attributes: ['categoria', [sequelize.fn('SUM', sequelize.col('valor')), 'soma']], //Soma os valores das transações para cada categoria
            where: { tipo: 'Saída' }, // << só despesas
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
// POST /api/transacoes
router.post('/', async (req: Request, res: Response) => {
    try {
        const { descricao, valor, tipo, data, categoria } = req.body;

        if (!descricao || !valor || !tipo || !data) {
            return res.status(400).json({ message: 'Descrição, valor, tipo e data são obrigatórios.' });
        }

        if (tipo === 'Saída' && !categoria) {
            return res.status(400).json({ message: 'Categoria é obrigatória para transações de saída.' });
        }

        const transacao = await Transacao.create({
            descricao,
            valor,
            tipo,
            data,
            categoria: tipo === 'Saída' ? categoria : null,
        });

        // ... (resto do seu código de orçamento/alerta)
        return res.status(201).json(transacao);
    } catch (error) {
        console.error('Erro ao cadastrar transação:', error);
        return res.status(500).json({ message: 'Erro interno ao cadastrar transação' });
    }
});

// PUT /api/transacoes/:id
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { descricao, valor, tipo, data, categoria } = req.body;
        const transacao = await Transacao.findByPk(req.params.id);

        if (!transacao) return res.status(404).json({ message: 'Transação não encontrada' });

        if (!descricao || !valor || !tipo || !data) {
            return res.status(400).json({ message: 'Descrição, valor, tipo e data são obrigatórios.' });
        }
        if (tipo === 'Saída' && !categoria) {
            return res.status(400).json({ message: 'Categoria é obrigatória para transações de saída.' });
        }

        transacao.descricao = descricao;
        transacao.valor = valor;
        transacao.tipo = tipo;
        transacao.data = data;
        transacao.categoria = tipo === 'Saída' ? categoria : null;

        await transacao.save();
        return res.status(200).json(transacao);
    } catch (error) {
        console.error('Erro ao atualizar transação:', error);
        return res.status(500).json({ message: 'Erro interno ao atualizar transação' });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const transacao = await Transacao.findByPk(req.params.id);
        if (!transacao) return res.status(404).json({ message: 'Transação não encontrada' });

        await transacao.destroy(); //destroy é um método do Sequelize que deleta o registro do banco de dados.
        return res.status(200).json({ message: 'Transação deletada com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar transação:', error);
        return res.status(500).json({ message: 'Erro interno ao deletar transação' });
    }
});

// Nova rota para obter as somas desejadas
router.get('/resumo', async (req: Request, res: Response) => {
    try {
        
        // Soma total de Entradas
        const somaEntradas = await Transacao.sum('valor', {
            where: { tipo: 'Entrada' },
        });

        // Soma total de Saídas
        const somaSaidas = await Transacao.sum('valor', {
            where: { tipo: 'Saída' },
        });

        // Soma de Saídas por Categoria
        const somaSaidasPorCategoria = await Transacao.findAll({
            attributes: [
                'categoria',
                [sequelize.fn('SUM', sequelize.col('valor')), 'soma'],
            ],
            where: { tipo: 'Saída' },
            group: ['categoria'],
            raw: true,
        });

        // Calcular o saldo (Entradas - Saídas)
        const saldo = somaEntradas - somaSaidas;

        return res.status(200).json({
            somaEntradas,
            somaSaidas,
            somaSaidasPorCategoria,
            saldo,
        });
    } catch (error) {
        console.error('Erro ao calcular os resumos de transações:', error);
        return res.status(500).json({ message: 'Erro ao calcular os resumos' });
    }
});

export default router;