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

        // Obter orçamento
        const orcamento = await Orcamento.findOne(); // Você pode melhorar essa consulta caso tenha vários orçamentos
        // Verificar se orcamento é nulo ou undefined
        if (!orcamento) {
            return res.status(404).json({ message: 'Orçamento não encontrado' });
        }

        // Verificar se o orçamento foi ultrapassado
        const alertas = somaCategoria.map((categoria: any) => {
            const categoriaLower = categoria.categoria?.toLowerCase(); // Garantir que a categoria seja minúscula
            const limite = orcamento[categoriaLower as keyof Orcamento]; // Acessar com segurança usando 'keyof Orcamento'

            if (limite !== undefined && categoria.soma > limite) {
                return {
                    categoria: categoria.categoria,
                    alerta: `Orçamento ultrapassado em ${Math.abs(categoria.soma - limite).toFixed(2)} na categoria ${categoria.categoria}`,
                };
            }
            return null;
        }).filter(alerta => alerta !== null);

        return res.status(200).json({ somaCategoria, alertas });
    } catch (error) {
        console.error('erro ao calcular a soma das transações', error);
        return res.status(500).json({ message: 'erro interno ao calcular categorias' });
    }

})

router.get('/alertas', async (req: Request, res: Response) => {
    try {
        const transacoes = await Transacao.findAll({
            where: { tipo: 'Saída' },
            attributes: ['categoria', [sequelize.fn('SUM', sequelize.col('valor')), 'total']],
            group: ['categoria'],
            raw: true,
        });

        const orcamento = await Orcamento.findOne();
        if (!orcamento) {
            return res.status(404).json({ message: 'Orçamento não encontrado' });
        }
        const alertas = transacoes.map((transacao: any) => {
            const categoriaLower = transacao.categoria?.toLowerCase();
            const limite = orcamento[categoriaLower as keyof Orcamento]; // Acessa o limite do orçamento com base na categoria da transação
            if (limite !== undefined && transacao.total > limite) {
                return {
                    categoria: transacao.categoria,
                    totalGasto: transacao.total,
                    limite,
                    diferenca: transacao.total - limite,
                };
            }
            return null;
        }).filter((alerta: any) => alerta !== null);

        return res.status(200).json(alertas);
    } catch (error) {
        console.error('Erro ao buscar alertas:', error);
        return res.status(500).json({ message: 'Erro interno ao buscar alertas' });
    }
});

router.get('/ultimas', async (req: Request, res: Response) => {
    try {
        const ultimasTransacoes = await Transacao.findAll({
            order: [['data', 'DESC']], // Ordena pela data em ordem decrescente
            limit: 5, // Limita a 5 transações
        });
        return res.status(200).json(ultimasTransacoes);
    } catch (error) {
        console.error('Erro ao buscar últimas transações:', error);
        return res.status(500).json({ message: 'Erro interno ao buscar últimas transações' });
    }
});
router.get('/soma-mes', async (req: Request, res: Response) => {
    try {
        const somaMes = await Transacao.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('valor')), 'soma'],
                [sequelize.fn('MONTH', sequelize.col('data')), 'mes']
            ],
            where: { tipo: 'Saída' },
            group: [sequelize.fn('MONTH', sequelize.col('data'))],
            raw: true,
        });
        return res.status(200).json(somaMes);
    } catch (error) {
        console.error('Erro ao buscar soma por mês:', error);
        return res.status(500).json({ message: 'Erro interno ao buscar soma por mês' });
    }
});
router.get('/soma-ano', async (req: Request, res: Response) => {
    try {
        const somaAno = await Transacao.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('valor')), 'soma'],
                [sequelize.fn('YEAR', sequelize.col('data')), 'ano']
            ],
            where: { tipo: 'Saída' },
            group: [sequelize.fn('YEAR', sequelize.col('data'))],
            raw: true,
        });
        return res.status(200).json(somaAno);
    } catch (error) {
        console.error('Erro ao buscar soma por ano:', error);
        return res.status(500).json({ message: 'Erro interno ao buscar soma por ano' });
    }
});


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
        const somaEntradas = await Transacao.sum('valor', { where: { tipo: 'Entrada' } });

        // Soma total de Saídas
        const somaSaidas = await Transacao.sum('valor', { where: { tipo: 'Saída' } });

        // Soma de Saídas por Categoria
        const somaSaidasPorCategoria = await Transacao.findAll({
            attributes: ['categoria', [sequelize.fn('SUM', sequelize.col('valor')), 'soma']],
            where: { tipo: 'Saída' },
            group: ['categoria'],
            raw: true,
        });

        // Obter orçamento
        const orcamento = await Orcamento.findOne();
        let alertas: { categoria: string; alerta: string }[] = [];

        if (orcamento) {
            alertas = somaSaidasPorCategoria.map((categoria: any) => {
                const key = categoria.categoria?.toLowerCase(); // "essenciais", "não essenciais", etc
                const limite = key ? (orcamento as any)[key] : 0;
                if (limite && categoria.soma > limite) {
                    return {
                        categoria: categoria.categoria,
                        alerta: `Orçamento ultrapassado em ${(categoria.soma - limite).toFixed(2)} na categoria ${categoria.categoria}`,
                    };
                }
                return null;
            }).filter(Boolean) as { categoria: string; alerta: string }[];
        }

        // Calcular saldo
        const saldo = (somaEntradas || 0) - (somaSaidas || 0);

        return res.status(200).json({
            somaEntradas: somaEntradas || 0,
            somaSaidas: somaSaidas || 0,
            somaSaidasPorCategoria,
            saldo,
            alertas, // <-- aqui é o importante
        });
    } catch (error) {
        console.error('Erro ao calcular os resumos de transações:', error);
        return res.status(500).json({ message: 'Erro ao calcular os resumos' });
    }
});


export default router;