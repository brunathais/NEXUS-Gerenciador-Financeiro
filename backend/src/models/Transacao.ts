
import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

class Transacao extends Model {
    public id!: number;
    public descricao!: string;
    public valor!: number;
    public tipo!: string;
    public data!: Date;
    public categoria!: string | null; // Categoria pode ser null para entradas
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
        categoria: {
            type: DataTypes.STRING,
            allowNull: true, // Categoria é opcional para entradas
            validate: {
                // Validação da categoria somente para 'Saída'
                isIn: {
                    args: [['Essenciais', 'Não essenciais', 'Imprevistos']],
                    msg: 'Categoria inválida. Deve ser "Essenciais", "Não essenciais" ou "Imprevistos".',
                },
            },
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

