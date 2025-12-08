import { Routes, Route, Navigate } from 'react-router-dom';
import Cadastro from './components/Cadastro/Cadastro';
import Login from './components/login/Login';
import Home from './components/Home';
import MetasForm from './components/metas/MetasForm';
import OrcamentoForm from './components/OrcamentoForm';
import TransactionPage from './components/transactions/TransactionPage';
import ContaForm from './components/ContaForm';
import ContaEdit from './components/ContaEdit';
import MetasPage from './components/metas/MetasPage';
import RelatorioUsuarios from './components/RelatorioUsuarios/RelatorioUsuarios';

export default function App() {
  const handleLoginSuccess = () => {
    window.location.href = '/home'; // Redireciona após login
  };

  return (
    <Routes>
      <Route path='/' element={<Navigate to="/cadastro" />} />
      <Route path='/cadastro' element={<Cadastro />} />
      <Route path='/login' element={<Login onSuccess={handleLoginSuccess} />} />
      <Route path='/home' element={<Home />} />
      <Route path="/transacoes" element={<TransactionPage />} />
      <Route path="/metas" element={<MetasPage />} />
      <Route path="/metas/novo" element={<MetasForm />} />
      <Route path="/orcamentos" element={<OrcamentoForm />} />
      <Route path="/contas" element={<ContaForm />} />
      <Route path="/contas/editar/:id" element={<ContaEdit />} />
      <Route path="/relatorio-usuario" element={<RelatorioUsuarios />} />
    </Routes>
  );
}