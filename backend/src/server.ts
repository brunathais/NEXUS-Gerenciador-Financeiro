import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from './db';
import './models/User';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import transactionsRoutes from './routes/transactions';
import metaRoutes from './routes/metas';
import orcamentoRoutes from './routes/orcamento';

const app = express();

const allowed = process.env.CLIENT_ORIGIN?.split(',') ?? ['*'];
app.use(cors({ origin: (origin: string | undefined, cb: (err: Error | null, allow?: boolean) => void) => cb(null, !!(allowed.includes('*') || (origin && allowed.includes(origin)))) } as any));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.use('/api/transacoes', transactionsRoutes);
app.use('/api/metas', metaRoutes);
app.use('api/orcamentos', orcamentoRoutes)

const port = Number(process.env.PORT || 3000);

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // ou sync({ alter: true }) em dev
    app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));
  } catch (err) {
    console.error('Falha ao conectar no banco:', err);
    process.exit(1);
  }
}

start();