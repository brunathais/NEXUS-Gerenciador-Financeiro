import { useState } from 'react';
import { api } from '../../api';
import { setToken } from '../../auth';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Para ícone de olhinho
import './login.css';
export default function Login({ onSuccess }: { onSuccess: () => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);
    const [passwordVisible, setPasswordVisible] = useState(false); // Controle de visibilidade da senha
    const [emailCount, setEmailCount] = useState(0); // Contador de caracteres para o email
    const [passwordCount, setPasswordCount] = useState(0); // Contador de caracteres para a senha
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
            <h1 className="login-title">Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailCount(e.target.value.length); // Atualiza o contador de caracteres
                        }}
                        required
                        maxLength={30} // Limitação de caracteres
                        title="Digite seu email"
                        placeholder="Digite seu email"
                        className="input-field"
                    />
                    <div className="char-count">{emailCount}/30</div> {/* Exibe o contador */}
                </div>
                <div className="input-group">
                    <label>Senha</label>
                    <div className="password-container">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordCount(e.target.value.length); // Atualiza o contador de caracteres
                            }}
                            required
                            minLength={6}
                            maxLength={30} // Limitação de caracteres
                            title="Digite sua senha"
                            placeholder="Digite sua senha"
                            className="input-field"
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </button>
                    </div>
                    <div className="char-count">{passwordCount}/30</div> {/* Exibe o contador */}
                </div>

                <button type="submit" disabled={loading} className="submit-button">
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>

            {msg && <p className="error-message">{msg}</p>}
        </div>
    );
}
