import { Model, DataTypes } from 'sequelize';
import sequelize from '../db'; // Adjust path if needed

class Transacao extends Model {
    public id!: number;
    public descricao!: string;
    public valor!: number;
    public tipo!: string;
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
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Transacao',
        tableName: 'transacoes',
        timestamps: false,
    }
);

export default Transacao;