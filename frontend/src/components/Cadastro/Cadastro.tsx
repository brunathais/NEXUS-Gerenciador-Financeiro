import { useState } from 'react';
import { api } from '../../api';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';  // ícones para ver a senha
import './Cadastro.css';

export default function Cadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // Para controlar visibilidade da senha
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      await api.post('/users', { name, email, password });
      setMsg('Conta criada com sucesso!');
      setTimeout(() => navigate('/home'), 1000);
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Erro ao criar usuário';
      setMsg(msg);
    } finally {
      setLoading(false);
    }
  }

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="register-container">
      <h1>Crie sua conta no Nexus 🪙</h1>
      <p>Gerencie suas finanças com facilidade.</p>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            maxLength={30}
          />
          <div className="char-count">{name.length}/30</div>
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="seuemail@exemplo.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            maxLength={30}
          />
          <div className="char-count">{email.length}/30</div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <div className="password-container">
            <input
              id="password"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="mín. 6 caracteres"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              maxLength={30}
            />
            <span className="eye-icon" onClick={handlePasswordToggle}>
              {passwordVisible ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <div className="char-count">{password.length}/30</div>
        </div>

        <button className="btn-primary" disabled={loading} type="submit">
          {loading ? 'Criando...' : 'Criar conta'}
        </button>
      </form>

      {msg && <p className="feedback">{msg}</p>}
    </div>
  );
}
