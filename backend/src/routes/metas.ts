import { Router, Request, Response } from 'express';
import Meta from '../models/Metas';
import MetaDeposito from '../models/MetaDeposito';
import { getMetaComProgresso, listMetasComProgresso } from '../services/metaProgress';
import { Op } from 'sequelize';

const router = Router();

// Criar meta
router.post('/', async (req: Request, res: Response) => {
    try {
        const {
            nome, categoria, valorAlvo, dataAlvo,
            prioridade, flexibilidade, contribuicaoMensal = 0,
            permiteDepositosExtras = true, tipoRecorrencia = 'UNICA',
            visibilidade = 'PRIVADA', compartilhadoCom = null,
        } = req.body;

        if (!nome || !valorAlvo) return res.status(400).json({ message: 'nome e valorAlvo são obrigatórios.' });

        const meta = await Meta.create({
            nome, categoria, valorAlvo, dataAlvo: dataAlvo || null,
            prioridade, flexibilidade,
            contribuicaoMensal, permiteDepositosExtras,
            tipoRecorrencia, visibilidade, compartilhadoCom,
        });

        const full = await getMetaComProgresso(meta.id);
        return res.status(201).json(full);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Erro ao criar meta' });
    }
});

// Listar metas (com progresso + sem histórico pesado)
router.get('/', async (_req, res) => {
    try {
        const metas = await listMetasComProgresso();
        return res.status(200).json(metas);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Erro ao listar metas' });
    }
});

// Detalhe da meta (com histórico compacto)
router.get('/:id', async (req, res) => {
    try {
        const data = await getMetaComProgresso(Number(req.params.id));
        if (!data) return res.status(404).json({ message: 'Meta não encontrada' });
        // últimas movimentações
        const historico = await MetaDeposito.findAll({
            where: { metaId: req.params.id },
            order: [['criadoEm', 'DESC']],
            limit: 10,
        });
        return res.status(200).json({ ...data, historico });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Erro ao buscar meta' });
    }
});

// Atualizar meta
router.put('/:id', async (req, res) => {
    try {
        const meta = await Meta.findByPk(req.params.id);
        if (!meta) return res.status(404).json({ message: 'Meta não encontrada' });

        const atualizaveis = [
            'nome', 'categoria', 'valorAlvo', 'dataAlvo', 'prioridade', 'flexibilidade',
            'contribuicaoMensal', 'permiteDepositosExtras', 'tipoRecorrencia', 'visibilidade', 'compartilhadoCom'
        ] as const;

        atualizaveis.forEach(k => {
            if (k in req.body) (meta as any)[k] = req.body[k];
        });

        await meta.save();
        const full = await getMetaComProgresso(meta.id);
        return res.status(200).json(full);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Erro ao atualizar meta' });
    }
});

// Excluir meta
router.delete('/:id', async (req, res) => {
    try {
        const meta = await Meta.findByPk(req.params.id);
        if (!meta) return res.status(404).json({ message: 'Meta não encontrada' });
        await meta.destroy();
        return res.status(204).send();
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Erro ao deletar meta' });
    }
});

// (2) Ação rápida: depósito extra
router.post('/:id/depositos', async (req, res) => {
    try {
        const { valor, observacao } = req.body;
        if (!valor || Number(valor) <= 0) return res.status(400).json({ message: 'Valor inválido' });

        const meta = await Meta.findByPk(req.params.id);
        if (!meta) return res.status(404).json({ message: 'Meta não encontrada' });
        if (!meta.permiteDepositosExtras) return res.status(400).json({ message: 'Depósitos extras não permitidos para esta meta' });

        await MetaDeposito.create({ metaId: meta.id, valor, observacao: observacao || null, origem: 'EXTRA' });
        const full = await getMetaComProgresso(meta.id);
        return res.status(201).json(full); // já reflete na barra de progresso
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Erro ao adicionar depósito' });
    }
});

// (2) Ação rápida: editar contribuição mensal
router.patch('/:id/contribuicao', async (req, res) => {
    try {
        const { contribuicaoMensal } = req.body;
        if (contribuicaoMensal == null || Number(contribuicaoMensal) < 0) {
            return res.status(400).json({ message: 'contribuicaoMensal inválida' });
        }
        const meta = await Meta.findByPk(req.params.id);
        if (!meta) return res.status(404).json({ message: 'Meta não encontrada' });

        meta.contribuicaoMensal = contribuicaoMensal;
        await meta.save();

        const full = await getMetaComProgresso(meta.id);
        return res.status(200).json(full);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Erro ao atualizar contribuição mensal' });
    }
});

// (4) Planejamento mensal: aplicar a contribuição do mês atual (evita duplicidade)
router.post('/:id/aplicar-mensal', async (req, res) => {
    try {
        const meta = await Meta.findByPk(req.params.id);
        if (!meta) return res.status(404).json({ message: 'Meta não encontrada' });

        const valor = Number(meta.contribuicaoMensal || 0);
        if (valor <= 0) return res.status(400).json({ message: 'contribuicaoMensal não configurada' });

        const now = new Date();
        const inicioMes = new Date(now.getFullYear(), now.getMonth(), 1);
        const proximoMes = new Date(now.getFullYear(), now.getMonth() + 1, 1);

        const jaAplicou = await MetaDeposito.findOne({
            where: {
                metaId: meta.id,
                origem: 'MENSAL',
                criadoEm: { [Op.gte]: inicioMes, [Op.lt]: proximoMes },
            },
        });
        if (jaAplicou) return res.status(409).json({ message: 'Contribuição mensal já aplicada neste mês' });

        await MetaDeposito.create({
            metaId: meta.id,
            valor,
            origem: 'MENSAL',
            observacao: `Contribuição mensal ${now.toLocaleDateString()}`,
        });

        const full = await getMetaComProgresso(meta.id);
        return res.status(201).json(full);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Erro ao aplicar contribuição mensal' });
    }
});

export default router;
