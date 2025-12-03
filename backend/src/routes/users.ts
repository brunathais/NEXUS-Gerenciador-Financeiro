import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import sequelize from '../db';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body as { name?: string; email?: string; password?: string };
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email e password são obrigatórios.' });
    }

    const emailLower = email.toLowerCase();

    const existing = await User.findOne({ where: { email: emailLower } });
    if (existing) {
      return res.status(409).json({ message: 'E-mail já cadastrado.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email: emailLower, passwordHash });
    return res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro interno ao criar usuário.' });
  }
});

router.get('/', async (_req, res) => {
  const users = await User.findAll({ attributes: ['id', 'name', 'email', 'createdAt'] });
  return res.json(users);
});

router.get('/relatorio-usuario', async (req, res) => {
  //quero agrupar por mês e contar quantos usuários foram criados em cada mês

  const [rows] = await sequelize.query(`select count(id_usuario) as total,
	(extract (month from data ) || '/' || extract ( year from data )) as data
  from acessos_usuarios
  group by 2
`);
  return res.json(rows);
});

export default router;
