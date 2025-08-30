import { Routes, Route, Navigate } from 'react-router-dom'
import Cadastro from './components/Cadastro'
import './styles/cadastro.css'
import Login from './components/Login'
import Home from './components/Home'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/cadastro" />} />
      <Route path='/cadastro' element={<Cadastro />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login onSuccess={() => window.location.href = '/home'} />} />
    </Routes>
  )
}
