import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db';

export type TipoConta = 'PAGAR' | 'RECEBER';
export type StatusConta = 'PENDENTE' | 'PAGO' | 'VENCIDO';

interface ContaAttrs {
    id: number;
    descricao: string;
    tipo: TipoConta;           // PAGAR ou RECEBER
    valor: number;
    dataVencimento: Date;
    status: StatusConta;      // PENDENTE, PAGO, VENCIDO
    dataPagamento?: Date;     // Para contas PAGAR
    lembreteEnviado?: boolean; // Se o lembrete foi enviado
    observacao?: string;
}

type ContaCreation = Optional<ContaAttrs, 'id' | 'status' | 'dataPagamento' | 'lembreteEnviado'>;

class Conta extends Model<ContaAttrs, ContaCreation> implements ContaAttrs {
    public id!: number;
    public descricao!: string;
    public tipo!: TipoConta;
    public valor!: number;
    public dataVencimento!: Date;
    public dataPagamento?: Date;
    public status!: StatusConta;
    public lembreteEnviado!: boolean;
    
}

Conta.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        descricao: { type: DataTypes.STRING, allowNull: false },
        tipo: {
            type: DataTypes.ENUM('PAGAR', 'RECEBER'),
            allowNull: false,
        },
        valor: { type: DataTypes.DECIMAL(14, 2), allowNull: false },
        dataVencimento: { type: DataTypes.DATE, allowNull: false },
        status: {
            type: DataTypes.ENUM('PENDENTE', 'PAGO', 'VENCIDO'),
            allowNull: false,
            defaultValue: 'PENDENTE',
        },
        dataPagamento: { type: DataTypes.DATE, allowNull: true },
        lembreteEnviado: { type: DataTypes.BOOLEAN, defaultValue: false },
        observacao: { type: DataTypes.STRING, allowNull: true },
    },
    {
        sequelize,
        modelName: 'Conta',
        tableName: 'contas',
        timestamps: true,
    }
);

export default Conta;

