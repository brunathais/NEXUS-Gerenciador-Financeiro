import { Router } from 'express';
import { requireAuth } from './auth';
import Transaction from '../models/Transactions';
import { Op } from 'sequelize';

const router = Router();

router.post('/transacoes', async (req, res) => {
    try {
        const { type, value, date, description, category } = req.body;

        if (!type || !value || !date || !description || !category) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }
        if (type !== 'Despesa' && !category){
            return res.status(400).json({ message: 'Categoria é obrigatória para despesas.' });
        }
        const tran = await Transaction.create({
            userId: (req as any).userId,
            type,
            value,
            date,
            description,
            category: type === 'Despesa' ? category : null
        });
        return res.status(201).json(tran);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao criar transação.' });
}
});

router.get('/transacoes', requireAuth, async (req, res) => {
    try {
        const { type, category, startDate, endDate } = req.query as Record<string, string|undefined>;
        const where: any = {};
        if (type) where.type = type;
        if (category) where.category = category;
        if (startDate || endDate) {
            where.date = {};
            if (startDate) where.date[Op.gte] = startDate;
            if (endDate) where.date[Op.lte] = endDate;
        }
        const transactions = await Transaction.findAll({
            where, order: [['date', 'DESC'], ['createdAt', 'DESC']]
        });
        return res.json(transactions);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao buscar transações.' });
    }
});

router.put('/transacoes/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const tran = await Transaction.findByPk(id);
        if (!tran) {
            return res.status(404).json({ message: 'Transação não encontrada.' });
        }
        const { type, value, date, description, category } = req.body;
        if(type === 'Despesa' && !category){
            return res.status(400).json({ message: 'Categoria é obrigatória para despesas.' });
        }
        await tran.update({ type, value, date, description, category: type === 'Despesa' ? category : null });
        return res.json(tran);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao atualizar transação.' });
    }
});

router.delete('/transacoes/:id', requireAuth, async (req, res) => {
    try {
        const tran = await Transaction.findByPk(req.params.id);
        if (!tran) {
            return res.status(404).json({ message: 'Transação não encontrada.' });
        }
        await tran.destroy();
        return res.status(204).send();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao deletar transação.' });
    }
});

router.get('/transacoes/all', requireAuth, async (req, res) => {
    try {
        const transactions = await Transaction.findAll();
        let totalReceitas = 0;
        let totalDespesas = 0;

        for (const tran of transactions) {
            const val = Number(tran.value);
            if (tran.type === 'Receita') {
                totalReceitas += val;
            } else if (tran.type === 'Despesa') {
                totalDespesas += val;
            }
        }

        return res.json({ totalReceitas, totalDespesas });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao calcular totais.' });
    }
});

export default router;

