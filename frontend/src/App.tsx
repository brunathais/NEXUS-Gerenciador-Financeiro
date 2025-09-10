import { Routes, Route, Navigate } from 'react-router-dom'
import Cadastro from './components/Cadastro'
import './styles/cadastro.css'
import Login from './components/Login'
import Home from './components/Home'
import TransactionForm from './components/TransactionForm'
import MetasForm from './components/MetasForm'
import OrcamentoForm from './components/Orcamento'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/cadastro" />} />
      <Route path='/cadastro' element={<Cadastro />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login onSuccess={() => window.location.href = '/home'} />} />
      <Route path="/transacoes" element={<TransactionForm />} />
      <Route path="/metas" element={<MetasForm />} />
      <Route path='/orcamentos' element={<OrcamentoForm/>} />
    </Routes>

  )
}