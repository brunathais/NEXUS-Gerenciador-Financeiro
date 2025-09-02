import { Model, Optional } from 'sequelize';

interface MetasAtributes {
    id: string;
    nomeMeta: string;
    valorTotal: number;
    valorInicial: number;
    createdAt?: Date;
    updatedAt?: Date;
}

type MetasCreationAtributes = Optional<MetasAtributes, 'id' | 'createdAt' | 'updatedAt'>;

class Metas extends Model<MetasAtributes, MetasCreationAtributes> implements MetasAtributes {
    public id!: string;
    public nomeMeta!: string;
    public valorTotal!: number;
    public valorInicial!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

Metas.init(
    {
        id: {
            type: 'UUID',
            defaultValue: 'UUIDV4',
            primaryKey: true
        },
        nomeMeta: {
            type: 'STRING(120)',
            allowNull: false
        },
        valorTotal: {
            type: 'FLOAT',
            allowNull: false
        },
        valorInicial: {
            type: 'FLOAT',
            allowNull: false
        }
    },
    {
        sequelize: require('../db').default,
        tableName: 'Metas'
    }
);

export default MetasAtributes;
