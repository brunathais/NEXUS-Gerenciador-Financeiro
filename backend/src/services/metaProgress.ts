import { fn, col } from 'sequelize';
import Meta from '../models/Metas';
import MetaDeposito from '../models/MetaDeposito';

export async function getMetaComProgresso(metaId: number) {
    const meta = await Meta.findByPk(metaId, { include: [{ model: MetaDeposito, as: 'depositos', limit: 5, order: [['criadoEm', 'DESC']] }] });
    if (!meta) return null;

    const totalRow = await MetaDeposito.findOne({
        where: { metaId },
        attributes: [[fn('COALESCE', fn('SUM', col('valor')), 0), 'total']],
        raw: true,
    });
    const total = Number((totalRow as any)?.total || 0);
    const alvo = Number(meta.valorAlvo);
    const perc = alvo > 0 ? Math.min((total / alvo) * 100, 100) : 0;
    const falta = Math.max(alvo - total, 0);

    return {
        meta,
        progresso: {
            totalPoupado: total,
            valorAlvo: alvo,
            porcentagem: Number(perc.toFixed(2)),
            falta,
        },
    };
}

export async function listMetasComProgresso() {
    const metas = await Meta.findAll({ order: [['createdAt', 'DESC']] });
    const ids = metas.map(m => m.id);
    const somaPorMeta = await MetaDeposito.findAll({
        where: { metaId: ids },
        attributes: ['metaId', [fn('COALESCE', fn('SUM', col('valor')), 0), 'total']],
        group: ['metaId'],
        raw: true,
    });
    const mapa = new Map<number, number>();
    somaPorMeta.forEach(r => mapa.set((r as any).metaId, Number((r as any).total)));

    return metas.map(m => {
        const total = mapa.get(m.id) || 0;
        const alvo = Number(m.valorAlvo);
        const perc = alvo > 0 ? Math.min((total / alvo) * 100, 100) : 0;
        const falta = Math.max(alvo - total, 0);
        return {
            ...m.toJSON(),
            progresso: {
                totalPoupado: total,
                valorAlvo: alvo,
                porcentagem: Number(perc.toFixed(2)),
                falta,
            },
        };
    });
}