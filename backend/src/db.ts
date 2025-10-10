/** sql server
 * import { Sequelize } from 'sequelize';

const required = (value: string | undefined, key: string) => {
  if (!value) throw new Error(`Missing env: ${key}`);
  return value;
};

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
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

*/

// postgres
import { Sequelize } from 'sequelize';

const required = (value: string | undefined, key: string) => {
    if (!value) throw new Error(`Missing env: ${key}`);
    return value;
};

// Configuração para PostgreSQL
const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 5432),  // Porta padrão do PostgreSQL
        dialect: 'postgres',  // Mudança de 'mssql' para 'postgres'
        logging: false,
        dialectOptions: {
            ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
        },
    }
);

export default sequelize;
