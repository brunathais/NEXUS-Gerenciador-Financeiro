import { useState } from 'react';
import { api } from '../api';
import { setToken } from '../auth';
import { useNavigate } from 'react-router-dom';

export default function Login({ onSuccess }: { onSuccess: () => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMsg(null);
        setLoading(true);

        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user } = response.data;

            // Armazenar o token e dados do usuário no localStorage
            setToken(token);

            // Chamar a função onSuccess para redirecionar para a página inicial
            onSuccess();
        } catch (err: any) {
            setMsg(err?.response?.data?.message || 'Erro ao fazer login');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        title="Digite seu email"
                        placeholder="Digite seu email"
                    />
                </div>
                <div>
                    <label>Senha</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        title="Digite sua senha"
                        placeholder="Digite sua senha"
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>

            {msg && <p>{msg}</p>}
        </div>
    );
}
