import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db';
// Assuming User model is defined in User.ts

interface TransactionAttributes {
    idTransacao: string;
    userId: string;
    type: 'Receita' | 'Despesa';
    value: number;
    date: Date;
    description: string;
    category: string;
    createdAt?: Date;
    updatedAt?: Date;
}

type TransactionCreationAttributes = Optional<TransactionAttributes, 'idTransacao' | 'createdAt' | 'updatedAt'>;

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
    public idTransacao!: string;
    public userId!: string;
    public type!: 'Receita' | 'Despesa';
    public value!: number;
    public date!: Date;
    public description!: string;
    public category!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Transaction.init(
    {
        idTransacao: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: 'Users', key: 'id' }
        },
        type: {
            type: DataTypes.ENUM('Receita', 'Despesa'),
            allowNull: false
        },
        value: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        category: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'Transactions'
    }
);

export default Transaction;