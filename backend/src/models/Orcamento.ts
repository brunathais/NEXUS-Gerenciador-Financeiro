
import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

class Orcamento extends Model {
    public id!: number;
    public descricao!: string;
    public essenciais!: number;
    public naoEssenciais!: number;
    public imprevistos!: number;
    public poupanca!: number;
    public investimentos!: number;
}

Orcamento.init(
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
        essenciais: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        naoEssenciais: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        imprevistos: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        poupanca: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        investimentos: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Orcamento',
        tableName: 'orcamentos',
        timestamps: false,
    }
);
export default Orcamento;