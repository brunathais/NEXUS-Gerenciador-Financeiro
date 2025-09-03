import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api'
import { setToken } from '../auth'
import '../styles/login.css'

export default function Login({ onSuccess }: { readonly onSuccess: () => void }) {
    const [emailOrUser, setEmailOrUser] = useState('') // você pode aceitar e-mail ou usuário
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setMsg(null)

        if (!emailOrUser || !password) {
            setMsg({ tipo: 'erro', texto: 'Preencha todos os campos!' })
            return
        }
        if (password.length < 6) {
            setMsg({ tipo: 'erro', texto: 'Senha deve ter pelo menos 6 caracteres!' })
            return
        }

        setLoading(true)
        try {
            // Se seu backend usa e-mail, mapear:
            const { data } = await api.post('/auth/login', {
                email: emailOrUser,
                password
            })
            setToken(data.token)
            setMsg({ tipo: 'sucesso', texto: 'Login realizado com sucesso!' })
            setTimeout(() => navigate('/home'), 800)
        } catch (err: any) {
            const texto = err?.response?.data?.message || 'Erro ao fazer login'
            setMsg({ tipo: 'erro', texto })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-container">
            <h1>Bem-vindo ao Nexus! 🪙</h1>
            <p>Gerencie suas finanças de forma inteligente!</p>

            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="usuario">Usuário ou e-mail:</label>
                <input
                    id="usuario"
                    type="text"
                    placeholder="Digite seu usuário ou e-mail"
                    maxLength={50}
                    value={emailOrUser}
                    onChange={(e) => setEmailOrUser(e.target.value)}
                    required
                />

                <label htmlFor="senha">Senha:</label>
                <input
                    id="senha"
                    type="password"
                    placeholder="Digite sua senha"
                    maxLength={50}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>

            {msg && <div className={`mensagem ${msg.tipo}`}>{msg.texto}</div>}

            <p className="register-text">
                Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
            </p> 
            
            {/* msg */}

        </div>
    )
}
