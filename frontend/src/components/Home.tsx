import React from 'react';
import '../styles/home.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {     

   
    const navigate = useNavigate();

        const handleNavigation = (route) => {
        navigate(route);
    };

     return (
        <>
        <h1>NEXUS</h1> <br />
          
         {/*   <button onClick={() => handleNavigation('/transacoes')}>
                Ir para Transações
            </button>*/}

                        <link rel="stylesheet" href="../styles/home.css" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <div className="menu-toggle" id="toggleButton"></div>
            <div className="icone-usuario"></div>
            <div id="notificacao-menu"></div>
        
            <div className="sidebar" id="sidebar">
                <h1>NEXUS</h1>
                <ul>
                    <li><a href="#">Dashboard</a></li><br />

                </ul>
            </div>
            
            <div className="main-buttons">
        <button onClick={() => handleNavigation('/educacao-financeira')}>
            Educação Financeira
        </button>
        <button onClick={()=> handleNavigation ('/orcamento')}>
            Orçamento
        </button>
        <button onClick={()=> handleNavigation ('/contas')}>
            Contas e Boletos
        </button>
        <button onClick={()=> handleNavigation ('/graficos')}>
            Gráficos
        </button>
        <button onClick={()=> handleNavigation ('/metas')}>
            Metas
        </button>
        <button onClick={()=> handleNavigation ('/transacoes')}>
            Transações
        </button>
    </div>



   
     
       
{/* Componente de navegação 
        <button onClick={handleClick}>
            ir para transações
        </button>*/}
    
           


                
                    
                 {/*  <a href="../educacaoFinanceira/educacaoFinanceira.html" className="main-button">Educação Financeira</a><br /> <br />
                    <a href="../orcamento/orcamento.html" className="main-button">Orçamento</a><br />  <br />
                    <a href="../contas/contas.html" className="main-button">Contas e Boletos</a><br />  <br />
                    <a href="../graficos/graficos.html" className="main-button">Gráficos</a><br />  <br />
                    <a href="../metas/metas.html" className="main-button">Metas</a><br />  <br />
                </div>*/}
        </>
    );
}