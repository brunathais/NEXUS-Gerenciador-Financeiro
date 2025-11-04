import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Categoria extends Model {
    public id!: number;
    public nome!: string; // Nome da categoria, ex: 'Essenciais', 'Não essenciais', etc.
}

Categoria.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Categoria',
        tableName: 'categorias',
        timestamps: false, // Não há timestamps para categorias
    }
);

export default Categoria;
