import { Router } from "express";

const router = Router();

router.post("/metas", async (req, res) => {
    try{
        const{ nomeMeta, valorInicial, valorTotal } = req.body as {nomeMeta?: string, valorInicial?: number, valorTotal?: number}; 
        if(!nomeMeta || !valorInicial || !valorTotal) {
            return res.status(400).json({message: 'nomeMeta, valorInicial e valorTotal são obrigatórios.'});
        }
        // Lógica para salvar a meta no banco de dados
        return res.status(201).json({message: 'Meta criada com sucesso.'});
    } catch(err) { // Captura de erros
        console.error(err); // Log do erro para depuração
        return res.status(500).json({message: 'Erro interno ao criar meta.'}); // Erro genérico
    }

    })

    router.get("/metas",async (req, res) =>{
        try{
            // Lógica para buscar as metas no banco de dados
            return res.json([]); // Retorna a lista de metas (atualmente vazia)
        } catch(err) {
            console.error(err); // Log do erro para depuração
            return res.status(500).json({message: 'Erro interno ao buscar metas.'}); // Erro genérico



        }
    })
    export default router;