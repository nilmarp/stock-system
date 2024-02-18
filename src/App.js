import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Routing from './routing';
import { api } from './config/api';
import NotFound from './pages/notFound';
import Stock from './pages/stock';
import AsideMenu from './components/AsideMenu';

function App() {

    const [data, setData] = useState()

    const [tab, setTab] = useState('home')

    useEffect(async () => {
        setData(await api.get('/'))
    }, [])

    console.log(data)

    const routes = ['home', 'stock']

    console.log(routes.find((e) => e.name == tab))

    if (!(routes.includes(tab))) {
        return (
            <NotFound func={setTab} />
        )
    }

    return (
        <>
            <>
                <AsideMenu func={setTab} />
            </>
            <>
                {tab == 'home' && <Home />}
                {tab == 'stock' && <Stock />}
            </>
        </>
    );
}

export default App;
