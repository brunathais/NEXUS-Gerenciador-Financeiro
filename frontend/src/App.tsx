import { Routes, Route, Navigate } from 'react-router-dom';
import Cadastro from './components/Cadastro';
import Login from './components/Login';
import Home from './components/Home';
import TransactionForm from './components/TransactionForm';
import MetasForm from './components/MetasForm';
import Header from './components/header';
import { Graficos } from './components/Graficos';

export default function App() {
  const handleLoginSuccess = () => {
    window.location.href = '/home'; // Redireciona após login
  };

  return (
    <>
    <Header/>

    {/*conteudo principal que muda de acordo com a rota */}

    
    <Routes>
      <Route path='/' element={<Navigate to="/cadastro" />} />
      <Route path='/cadastro' element={<Cadastro />} />
      <Route path='/login' element={<Login onSuccess={handleLoginSuccess} />} />
      <Route path='/home' element={<Home />} />
      <Route path="/transacoes" element={<TransactionForm />} />
      <Route path="/metas" element={<MetasForm />} />
      <Route path ="/header" element = {<Header/>} />
      <Route path ="/graficos" element = {<Graficos/>} />
    </Routes>
    </>
  );
}