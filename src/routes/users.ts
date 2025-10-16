import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';

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

export default router;
