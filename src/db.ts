import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

const required = (value: string | undefined, key: string) => {
  if (!value) throw new Error(`Missing env: ${key}`);
  return value;
};

const sequelize = new Sequelize(
  required(process.env.DB_NAME, 'DB_NAME'),
  required(process.env.DB_USER, 'DB_USER'),
  required(process.env.DB_PASSWORD, 'DB_PASSWORD'),
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 1433),
    dialect: 'mssql',
    logging: false,
    dialectOptions: {
      options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERT !== 'false'
      }
    }
  }
);

export default sequelize;
