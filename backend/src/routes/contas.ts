import { Router, Request, Response } from 'express';
import Conta from '../models/Conta';

const router = Router();

// Criar nova conta
router.post('/', async (req: Request, res: Response) => {
  try {
    const { descricao, tipo, valor, dataVencimento, observacao } = req.body;
    if (!descricao || !valor || !dataVencimento || !tipo) {
      return res.status(400).json({ message: 'Campos obrigatórios não preenchidos.' });
    }

    const conta = await Conta.create({
      descricao,
      tipo,
      valor,
      dataVencimento,
      status: 'PENDENTE',
      observacao,
    });

    return res.status(201).json(conta);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Erro ao criar conta' });
  }
});

// Listar todas as contas
router.get('/', async (req: Request, res: Response) => {
  try {
    const contas = await Conta.findAll({ order: [['dataVencimento', 'ASC']] });
    return res.status(200).json(contas);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Erro ao listar contas' });
  }
});

// 🔹 Buscar uma conta específica para edição
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const conta = await Conta.findByPk(req.params.id);
    if (!conta) {
      return res.status(404).json({ message: 'Conta não encontrada' });
    }
    return res.status(200).json(conta);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Erro ao buscar conta' });
  }
});

// 🔹 Atualizar dados da conta (edição)
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { descricao, tipo, valor, dataVencimento, observacao } = req.body;

    const conta = await Conta.findByPk(req.params.id);
    if (!conta) {
      return res.status(404).json({ message: 'Conta não encontrada' });
    }

    conta.descricao = descricao ?? conta.descricao;
    conta.tipo = tipo ?? conta.tipo;
    conta.valor = valor !== undefined ? Number(valor) : conta.valor;
    conta.dataVencimento = dataVencimento
      ? new Date(dataVencimento)
      : conta.dataVencimento;
    conta.observacao = observacao ?? conta.observacao;

    await conta.save();

    return res.status(200).json(conta);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Erro ao atualizar conta' });
  }
});

// Atualizar o status de uma conta (ex: de PENDENTE para PAGO)
router.put('/:id/status', async (req: Request, res: Response) => {
  try {
    const { status, dataPagamento } = req.body;
    const conta = await Conta.findByPk(req.params.id);
    if (!conta) return res.status(404).json({ message: 'Conta não encontrada' });

    conta.status = status;
    if (status === 'PAGO') conta.dataPagamento = dataPagamento || new Date();
    await conta.save();

    return res.status(200).json(conta);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Erro ao atualizar status da conta' });
  }
});

// Deletar uma conta
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const conta = await Conta.findByPk(req.params.id);
    if (!conta) return res.status(404).json({ message: 'Conta não encontrada' });

    await conta.destroy();
    return res.status(204).send();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Erro ao deletar conta' });
  }
});

// Enviar lembrete para contas pendentes
router.post('/:id/lembrete', async (req: Request, res: Response) => {
  try {
    const conta = await Conta.findByPk(req.params.id);
    if (!conta) return res.status(404).json({ message: 'Conta não encontrada' });

    if (conta.status !== 'PENDENTE' || conta.lembreteEnviado) {
      return res.status(400).json({ message: 'Lembrete não pode ser enviado.' });
    }

    conta.lembreteEnviado = true;
    await conta.save();

    return res.status(200).json({ message: 'Lembrete enviado' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Erro ao enviar lembrete' });
  }
});

export default router;