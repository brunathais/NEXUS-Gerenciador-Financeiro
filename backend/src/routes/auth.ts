import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';
import sequelize from '../db';

const router = Router();

/**
 * POST /api/auth/login
 * body: { email: string, password: string }
 */
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as { email?: string; password?: string };
        if (!email || !password) {
            return res.status(400).json({ message: 'email e password são obrigatórios.' });
        }

        const emailLower = email.toLowerCase().trim();

        // 1) Busca usuário no banco
        const user = await User.findOne({ where: { email: emailLower } });
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // 2) Compara senha
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        

        // 3) Gera token
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ message: 'Configuração ausente: defina JWT_SECRET no .env.' });
        }

        const token = jwt.sign(
            { sub: user.id, email: user.email, name: user.name },
            secret,
            { expiresIn: '1d' }
        );
             await sequelize.query('INSERT INTO acessosUnicos (usuario, data) VALUES ( '+ user.id+' , now()::date )on conflict do nothing' );


        return res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (err) {
        console.error('Erro no login:', err);
        return res.status(500).json({ message: 'Erro interno no login.' });
    }
});

/** Middleware para proteger rotas privadas usando Bearer token */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const auth = req.headers.authorization || '';
        const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
        if (!token) return res.status(401).json({ message: 'Sem token' });

        const secret = process.env.JWT_SECRET;
        if (!secret) return res.status(500).json({ message: 'Configuração ausente: JWT_SECRET' });

        const payload = jwt.verify(token, secret) as JwtPayload | string;
        (req as any).auth = payload;
        next();
    } catch {
        return res.status(401).json({ message: 'Token inválido' });
    }
}

export default router;
