import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";



// pages
import Home from './pages/home';
import NotFound from './pages/notFound';
import Stock from './pages/stock';
import AsideMenu from './components/AsideMenu';
import Received from './pages/received';
import Withdraw from './pages/withdraw';
import Clients from './pages/clients';
import Finances from './pages/finances';

function App() {

    const [tab, setTab] = useState('home')

    // CONFIGURAÇÃO DE TELAS ACEITAS. O NOME DEVE SER ESTRITAMENTE IGUAL AO QUE SERÁ USADO NO TESTE ABAIXO (1)
    const routes = ['home', 'stock', 'received', 'withdrawn', 'clients', 'finances']

    if (!(routes.includes(tab))) {
        return (
            <NotFound func={setTab} />
        )
    }
    return (
        <PrimeReactProvider>
            <div style={{ display: 'flex' }}>
                <>
                    <AsideMenu func={setTab} current={tab}/>
                </>
                <>
                {/* (1) TESTE PARA RENDERIZAÇÃO DA TELA */}
                    {tab == 'home' && <Home />}
                    {tab == 'stock' && <Stock />}
                    {tab == 'received' && <Received />}
                    {tab == 'withdrawn' && <Withdraw func={setTab} />}
                    {tab == 'clients' && <Clients />}
                    {tab == 'finances' && <Finances />}
                </>
                <ToastContainer />
            </div>
        </PrimeReactProvider>
    );
}

export default App;
