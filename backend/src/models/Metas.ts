import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db';


export type CategoriaMeta = 'reserva' | 'viagem' | 'dividas' | 'bens' | 'outros';
export type Prioridade = 'ALTA' | 'MEDIA' | 'BAIXA';
export type Flexibilidade = 'FIXA' | 'PODE_ADIAR';
export type TipoRecorrencia = 'UNICA' | 'ANUAL' | 'MENSAL' | 'SEMESTRAL' | 'TRIMESTRAL';
export type Visibilidade = 'PRIVADA' | 'COMPARTILHADA';


interface MetaAttrs {
    id: number;
    nome: string;                 // antes "descricao"
    categoria: CategoriaMeta;
    valorAlvo: number;
    dataAlvo?: Date | null;       // opcional
    prioridade: Prioridade;
    flexibilidade: Flexibilidade;
    contribuicaoMensal: number;   // compromisso mensal
    permiteDepositosExtras: boolean;
    tipoRecorrencia: TipoRecorrencia; // UNICA/ANUAL/etc.
    visibilidade: Visibilidade;
    compartilhadoCom?: string[] | null; // ids/emails (JSON)
}


type MetaCreation = Optional<
    MetaAttrs,
    'id' | 'dataAlvo' | 'compartilhadoCom'
>;


class Meta extends Model<MetaAttrs, MetaCreation> implements MetaAttrs {
    public id!: number;
    public nome!: string;
    public categoria!: CategoriaMeta;
    public valorAlvo!: number;
    public dataAlvo!: Date | null;
    public prioridade!: Prioridade;
    public flexibilidade!: Flexibilidade;
    public contribuicaoMensal!: number;
    public permiteDepositosExtras!: boolean;
    public tipoRecorrencia!: TipoRecorrencia;
    public visibilidade!: Visibilidade;
    public compartilhadoCom!: string[] | null;
}


Meta.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        nome: { type: DataTypes.STRING, allowNull: false },
        categoria: {
            type: DataTypes.ENUM('reserva', 'viagem', 'dividas', 'bens', 'outros'),
            allowNull: false,
            defaultValue: 'outros',
        },
        valorAlvo: { type: DataTypes.DECIMAL(14, 2), allowNull: false },
        dataAlvo: { type: DataTypes.DATE, allowNull: true },
        prioridade: {
            type: DataTypes.ENUM('ALTA', 'MEDIA', 'BAIXA'),
            allowNull: false,
            defaultValue: 'MEDIA',
        },
        flexibilidade: {
            type: DataTypes.ENUM('FIXA', 'PODE_ADIAR'),
            allowNull: false,
            defaultValue: 'PODE_ADIAR',
        },
        contribuicaoMensal: { type: DataTypes.DECIMAL(14, 2), allowNull: false, defaultValue: 0 },
        permiteDepositosExtras: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
        tipoRecorrencia: {
            type: DataTypes.ENUM('UNICA', 'ANUAL', 'MENSAL', 'SEMESTRAL', 'TRIMESTRAL'),
            allowNull: false,
            defaultValue: 'UNICA',
        },
        visibilidade: {
            type: DataTypes.ENUM('PRIVADA', 'COMPARTILHADA'),
            allowNull: false,
            defaultValue: 'PRIVADA',
        },
        compartilhadoCom: { type: DataTypes.JSON, allowNull: true }, // array de emails/ids
    },
    {
        sequelize,
        tableName: 'metas',
        modelName: 'Meta',
        timestamps: true,
    }
);


export default Meta;