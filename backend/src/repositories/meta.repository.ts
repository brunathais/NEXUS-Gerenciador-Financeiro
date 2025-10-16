import Meta from '../models/Metas';

export const criarMeta = async (descricao: string, valor: number, data: Date) => {
    const novaMeta = await Meta.create({ descricao, valor, data });
    return novaMeta;
};
