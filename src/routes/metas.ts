import { Router } from 'express';
import Meta from '../models/Metas';

const router = Router();

// Criar meta
router.post('/metas', async (req, res) => {
  try {
    const { nomeMeta, valorInicial, valorTotal } = req.body as {
      nomeMeta?: string; valorInicial?: number; valorTotal?: number
    };

    if (!nomeMeta || valorInicial === undefined || valorTotal === undefined) {
      return res.status(400).json({ message: 'nomeMeta, valorInicial e valorTotal são obrigatórios.' });
    }
    const meta = await Meta.create({ nomeMeta, valorInicial: Number(valorInicial), valorTotal: Number(valorTotal) });
    return res.status(201).json(meta);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro interno ao criar meta.' });
  }
});

// Listar metas
router.get('/metas', async (_req, res) => {
  try {
    const metas = await Meta.findAll({ order: [['createdAt', 'DESC']] });
    return res.json(metas);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro interno ao buscar metas.' });
  }
});

// Obter uma meta
router.get('/metas/:id', async (req, res) => {
  try {
    const meta = await Meta.findByPk(req.params.id);
    if (!meta) return res.status(404).json({ message: 'Meta não encontrada.' });
    return res.json(meta);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro interno ao buscar meta.' });
  }
});

// Atualizar meta
router.put('/metas/:id', async (req, res) => {
  try {
    const { nomeMeta, valorInicial, valorTotal } = req.body as {
      nomeMeta?: string; valorInicial?: number; valorTotal?: number
    };
    const meta = await Meta.findByPk(req.params.id);
    if (!meta) return res.status(404).json({ message: 'Meta não encontrada.' });

    if (nomeMeta !== undefined) (meta as any).nomeMeta = nomeMeta;
    if (valorInicial !== undefined) (meta as any).valorInicial = Number(valorInicial);
    if (valorTotal !== undefined) (meta as any).valorTotal = Number(valorTotal);

    await meta.save();
    return res.json(meta);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro interno ao atualizar meta.' });
  }
});

// Excluir meta
router.delete('/metas/:id', async (req, res) => {
  try {
    const meta = await Meta.findByPk(req.params.id);
    if (!meta) return res.status(404).json({ message: 'Meta não encontrada.' });
    await meta.destroy();
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro interno ao excluir meta.' });
  }
});

export default router;
