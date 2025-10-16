import { Model, DataTypes } from 'sequelize';
import sequelize from '../db'; // Adjust path if needed

class Metas extends Model {
    public id!: number;
    public descricao!: string;
    public valor!: number;
    public data!: Date;
}

Metas.init(
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
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Metas',
        tableName: 'metas',
        timestamps: false,
    }
);

export default Metas;