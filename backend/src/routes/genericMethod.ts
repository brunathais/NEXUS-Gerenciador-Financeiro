async function criarRecurso(model: any, data: any, res: Response): Promise<void> {
    try {
        const recurso = await model.create(data);
        return res.status(201).json(recurso);
    } catch (error) {
        console.error(`Erro ao criar recurso: ${error}`);
        return res.status(500).json({ message: 'Erro interno ao criar recurso' });
    }
}


async function atualizarRecurso(model: any, id: number, dados: any, res: Response) {
    try {
        const recurso = await model.findByPk(id);
        if (!recurso) return res.status(404).json({ message: `${model.name} não encontrado` });

        await recurso.update(dados);
        return res.status(200).json(recurso);
    } catch (error) {
        console.error(`Erro ao atualizar ${model.name}: ${error}`);
        return res.status(500).json({ message: `Erro interno ao atualizar ${model.name}` });
    }
}

async function excluirRecurso(model: any, id: number, res: Response) {
    try {
        const recurso = await model.findByPk(id);
        if (!recurso) return res.status(404).json({ message: `${model.name} não encontrado` });

        await recurso.destroy();
        return res.status(204).send(); // OK sem conteúdo
    } catch (error) {
        console.error(`Erro ao excluir ${model.name}: ${error}`);
        return res.status(500).json({ message: `Erro interno ao excluir ${model.name}` });
    }
}

async function buscarComFiltro(model: any, filters: any, res: Response) {
    try {
        const recursos = await model.findAll({ where: filters });
        return res.status(200).json(recursos);
    } catch (error) {
        console.error(`Erro ao buscar ${model.name}: ${error}`);
        return res.status(500).json({ message: `Erro interno ao buscar ${model.name}` });
    }
}
