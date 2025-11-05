import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';
import Categoria from './Categoria'; // Importando o modelo de Categoria
import User from './User'; // Importando o modelo de User

class Transacao extends Model {
    public id!: number;
    public descricao!: string;
    public valor!: number;
    public tipo!: 'Entrada' | 'Saída';
    public data!: Date;
    public categoriaId?: number; // Relacionamento com Categoria
    public userId!: string; // Relacionamento com o usuário que criou a transação
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
            type: DataTypes.ENUM('Entrada', 'Saída'),
            allowNull: false,
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        categoriaId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Categoria,
                key: 'id',
            },
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'Transacao',
        tableName: 'transacoes',
        timestamps: true, // Timestamps para saber quando a transação foi criada e atualizada
    }
);

// Relacionamento entre Transacao e User (um para muitos)
User.hasMany(Transacao, { foreignKey: 'userId' });
Transacao.belongsTo(User, { foreignKey: 'userId' });

// Relacionamento entre Transacao e Categoria (um para muitos)
Categoria.hasMany(Transacao, { foreignKey: 'categoriaId' });
Transacao.belongsTo(Categoria, { foreignKey: 'categoriaId' });

export default Transacao;
