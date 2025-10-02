import { Router, Request, Response } from 'express';
import { group } from "console"
import sequelize from "../db"
import Transacao from "../models/Transacao";

const router = Router()

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

export default router;
