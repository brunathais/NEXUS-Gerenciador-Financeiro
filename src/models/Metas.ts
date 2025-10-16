import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db';

export interface MetaAttributes {
  id: string;
  nomeMeta: string;
  valorTotal: number;
  valorInicial: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type MetaCreationAttributes = Optional<MetaAttributes, 'id' | 'createdAt' | 'updatedAt'>;

class Meta extends Model<MetaAttributes, MetaCreationAttributes> implements MetaAttributes {
  public id!: string;
  public nomeMeta!: string;
  public valorTotal!: number;
  public valorInicial!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Meta.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nomeMeta: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    valorTotal: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    valorInicial: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'Metas'
  }
);

export default Meta;
