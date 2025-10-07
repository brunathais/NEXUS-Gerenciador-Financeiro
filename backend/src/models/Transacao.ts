import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';
import Orcamento from './Orcamento';
class Transacao extends Model {
    public id!: number;
    public descricao!: string;
    public valor!: number;
    public tipo!: string; // 'entrada' ou 'saida'
    public categoria!: string; // Ex: 'essenciais', 'naoEssenciais', etc. Categoria pode ser null para entradas
    public orcamentoId!: number | null; // Relacionado ao ID do orçamento
    public data!: Date;
}

Transacao.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        valor: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        categoria: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        orcamentoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Orcamento,
                key: 'id'
            }
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Transacao',
        tableName: 'transacoes',
        timestamps: false,
    }
);
export default Transacao;


