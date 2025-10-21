import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db';
import Meta from './Metas';

interface MetaDepositoAttrs {
    id: number;
    metaId: number; // Refere-se à Meta
    valor: number;
    observacao?: string | null;
    origem: 'EXTRA' | 'MENSAL';
    criadoEm: Date;
}

type MetaDepositoCreation = Optional<MetaDepositoAttrs, 'id' | 'criadoEm'>;

class MetaDeposito extends Model<MetaDepositoAttrs, MetaDepositoCreation> implements MetaDepositoAttrs {
    public id!: number;
    public metaId!: number;
    public valor!: number;
    public observacao!: string | null;
    public origem!: 'EXTRA' | 'MENSAL';
    public criadoEm!: Date;
}

MetaDeposito.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        metaId: { type: DataTypes.INTEGER, allowNull: false },
        valor: { type: DataTypes.DECIMAL(14, 2), allowNull: false },
        observacao: { type: DataTypes.STRING(255), allowNull: true },
        origem: {
            type: DataTypes.ENUM('EXTRA', 'MENSAL'),
            allowNull: false,
            defaultValue: 'EXTRA',
        },
        criadoEm: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    },
    {
        sequelize,
        tableName: 'meta_depositos',
        modelName: 'MetaDeposito',
        timestamps: false, // criamos o campo criadoEm manualmente
    }
);

MetaDeposito.belongsTo(Meta, { foreignKey: 'metaId', as: 'meta' }); // Relacionamento com Meta
Meta.hasMany(MetaDeposito, { foreignKey: 'metaId', as: 'depositos' });

export default MetaDeposito;
