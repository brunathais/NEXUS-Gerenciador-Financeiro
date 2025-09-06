import { Model, DataTypes } from 'sequelize';
import sequelize from '../db'; // Adjust path if needed

class Meta extends Model {
    public id!: number;
    public descricao!: string;
    public valorTotal!: number;
    public valorInicial!: number;
    public data!: Date;
}

Meta.init(
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
        valorTotal: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        valorInicial: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Meta',
        tableName: 'metas',
        timestamps: false,
    }
);

export default Meta;