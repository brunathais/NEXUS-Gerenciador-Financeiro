import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';
import Transacao from './Transacao';
import User from './User';

class HistoricoTransacao extends Model {
    public id!: number;
    public transacaoId!: number;
    public userId!: string;
    public acao!: 'Criado' | 'Atualizado' | 'Deletado';
    public descricao!: string;
    public dataAlteracao!: Date;
}

HistoricoTransacao.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        transacaoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Transacao,
                key: 'id',
            },
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        acao: {
            type: DataTypes.ENUM('Criado', 'Atualizado', 'Deletado'),
            allowNull: false,
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dataAlteracao: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'HistoricoTransacao',
        tableName: 'historico_transacoes',
        timestamps: false, // Não precisa de timestamps aqui, mas pode ser útil
    }
);

export default HistoricoTransacao;
