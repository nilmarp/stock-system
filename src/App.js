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

function App() {

    const [tab, setTab] = useState('home')

    const routes = ['home', 'stock', 'received', 'withdraw']

    if (!(routes.includes(tab))) {
        return (
            <NotFound func={setTab} />
        )
    }
    return (
        <PrimeReactProvider>
            <div style={{ display: 'flex' }}>
                <>
                    <AsideMenu func={setTab} />
                </>
                <>
                    {tab == 'home' && <Home />}
                    {tab == 'stock' && <Stock />}
                    {tab == 'received' && <Received />}
                    {tab == 'withdraw' && <Withdraw />}
                </>
                <ToastContainer />
            </div>
        </PrimeReactProvider>
    );
}

export default App;
