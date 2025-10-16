import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

class Transacao extends Model {
    public id!: number;
    public descricao!: string;
    public valor!: number;
    public tipo!: 'Entrada' | 'Saída';
    public data!: Date;
    public categoria!: 'Essenciais' | 'Não essenciais' | 'Imprevistos' | null;
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
            // evita valores fora do esperado
            type: DataTypes.ENUM('Entrada', 'Saída'),
            allowNull: false,
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        categoria: {
            // pode ser null em 'Entrada'
            type: DataTypes.ENUM('Essenciais', 'Não essenciais', 'Imprevistos'),
            allowNull: true,
            validate: {
                // roda sempre; só exige quando for Saída
                requiredWhenSaida(this: Transacao, value: string | null) {
                    if (this.tipo === 'Saída' && !value) {
                        throw new Error('Categoria é obrigatória para transações de saída.');
                    }
                },
            },
        },
    },
    {
        sequelize,
        modelName: 'Transacao',
        tableName: 'transacoes',
        timestamps: false,
        // alternativa (modelo-level) se preferir:
        // validate: {
        //   categoriaObrigatoriaParaSaida() {
        //     if ((this as any).tipo === 'Saída' && !(this as any).categoria) {
        //       throw new Error('Categoria é obrigatória para transações de saída.');
        //     }
        //   },
        // },
    }
);

export default Transacao;
