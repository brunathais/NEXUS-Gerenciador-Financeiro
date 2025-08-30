import { useState } from 'react'
import { api } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Cadastro() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMsg(null)
    setLoading(true)
    try {
      await api.post('/users', { name, email, password })
      setMsg('Conta criada com sucesso!')
      setTimeout(() => navigate('/home'), 1000)
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Erro ao criar usuário'
      setMsg(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-container">
      <h1>Crie sua conta no Nexus 🪙</h1>
      <p>Gerencie suas finanças com facilidade.</p>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input id="name" placeholder="Seu nome" value={name} onChange={e=>setName(e.target.value)} required/>
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" placeholder="seuemail@exemplo.com" value={email} onChange={e=>setEmail(e.target.value)} required/>
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input id="password" type="password" placeholder="mín. 6 caracteres" value={password} onChange={e=>setPassword(e.target.value)} required minLength={6}/>
        </div>

        <button className="btn-primary" disabled={loading} type="submit">
          {loading ? 'Criando...' : 'Criar conta'}
        </button>
      </form>

      {msg && <p className="feedback">{msg}</p>}
    </div>
  )
}
