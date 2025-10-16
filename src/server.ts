import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from './db';
import './models/User';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import './models/Metas';
import metasRoutes from './routes/metas';

const app = express();

const allowed = (process.env.CLIENT_ORIGIN ?? '').split(',').filter(Boolean);
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowed.length === 0 || allowed.includes('*') || allowed.includes(origin)) {
      return cb(null, true);
    }
    return cb(new Error('Origin not allowed'), false);
  },
  credentials: true
}));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', metasRoutes);

const port = Number(process.env.PORT || 3000);

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));
  } catch (err) {
    console.error('Falha ao conectar no banco:', err);
    process.exit(1);
  }
}

start();
