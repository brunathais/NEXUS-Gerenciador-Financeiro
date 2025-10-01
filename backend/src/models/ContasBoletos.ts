
import { DataTypes, Model } from "sequelize";
import sequelize from '../db'; // Adjust path if needed



class ContasBoletos extends Model {
    public id!: number;
    public descricao!: string;
    public valor!: number;
    public dataVencimento!: Date;
    public codigoBoleto!: string;
}       

ContasBoletos.init(
    {
        id: {   
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255], // Limita a descrição entre 1 e 255 caracteres
            },
        },
        valor: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0, // Garante que o valor seja positivo
            },
        },
        dataVencimento: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        codigoBoleto: { 
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50], // Limita o código do boleto entre 1 e 50 caracteres
            },
        },
    },
    {
        sequelize,
        modelName: 'ContasBoletos',
        tableName: 'contas_boletos',
        timestamps: false,
    }
);
export default ContasBoletos;
