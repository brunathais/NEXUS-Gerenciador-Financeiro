import { Routes, Route, Navigate } from 'react-router-dom';
import Cadastro from './components/Cadastro';
import Login from './components/Login';
import Home from './components/Home';

import MetasForm from './components/metas/MetasForm';
import OrcamentoForm from './components/OrcamentoForm';
import TransactionPage from './components/transactions/TransactionPage';

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
      <Route path="/metas" element={<MetasForm />} />
      <Route path="/orcamentos" element={<OrcamentoForm />} />
    </Routes>
  );
}