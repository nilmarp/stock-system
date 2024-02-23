import React from "react"

export default function AsideMenu({ func, current }) {
    return (
        <div style={{
            fontWeight: 600,
            display: 'flex',
            height: 'calc(100vh - 36px)',
            width: '250px',
            padding: '20px 0',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            margin: '10px 10px',
        }}>
            <aside className="aside-menu" style={{
                fontWeight: 600,
                display: 'flex',
                height: 'calc(100vh - 26px)',
                width: '200px',
                padding: '20px 0',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: '#396fae',
                borderRadius: '8px',
                boxShadow: '1px 2px 13px -5px #396fae',
                position: "fixed",
                top: '10px',
                left: '10px'
            }}>
                <img src="public\logo-remove-bg.png" width="160px" height="100px" />
                <ul className="list-group" style={{ listStyle: 'none', width: '100%', height: '30vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: "center" }}>
                    <li style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 4px', borderRadius: '4px', height: '5vh', width: '200px' }}>
                        <button onClick={() => func('home')} style={{ width: 'calc(100% - 50px)', height: '30px', border: 8, textDecoration: 'none', color: current == 'home' ? '#396fae' : '#fff', backgroundColor: current == 'home' ? '#fff': 'transparent', border: '1px solid #fff', borderRadius: '4px', padding: '0 10px', display: 'flex', justifyContent: "flex-start", alignItems: "center", gap: '4px' }}>
                            <i className="bi bi-house-fill"></i>INICIO
                        </button>
                    </li>
                    <li style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 4px', borderRadius: '4px', height: '5vh', width: '200px' }}>
                        <button onClick={() => func('clients')} style={{ width: 'calc(100% - 50px)', height: '30px', border: 8, textDecoration: 'none', color: current == 'clients' ? '#396fae' : '#fff', backgroundColor: current == 'clients' ? '#fff': 'transparent', border: '1px solid #fff', borderRadius: '4px', padding: '0 10px', display: 'flex', justifyContent: "flex-start", alignItems: "center", gap: '4px' }}>
                            <i className="bi bi-person-fill"></i>CLIENTES
                        </button>
                    </li>
                    <li style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 4px', borderRadius: '4px', height: '5vh', width: '200px' }}>
                        <button onClick={() => func('withdrawn')} style={{ width: 'calc(100% - 50px)', height: '30px', border: 8, textDecoration: 'none', color: current == 'withdrawn' ? '#396fae' : '#fff', backgroundColor: current == 'withdrawn' ? '#fff': 'transparent', border: '1px solid #fff', borderRadius: '4px', padding: '0 10px', display: 'flex', justifyContent: "flex-start", alignItems: "center", gap: '4px' }}>
                            <i className="bi bi-box-arrow-in-up-right"></i>RETIRADOS
                        </button>
                    </li>
                    <li style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 4px', borderRadius: '4px', height: '5vh', width: '200px' }}>
                        <button onClick={() => func('received')} style={{ width: 'calc(100% - 50px)', height: '30px', border: 8, textDecoration: 'none', color: current == 'received' ? '#396fae' : '#fff', backgroundColor: current == 'received' ? '#fff': 'transparent', border: '1px solid #fff', borderRadius: '4px', padding: '0 10px', display: 'flex', justifyContent: "flex-start", alignItems: "center", gap: '4px' }}>
                            <i className="bi bi-cloud-arrow-down-fill"></i>RECEBIDOS
                        </button>
                    </li>
                    <li style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 4px', borderRadius: '4px', height: '5vh', width: '200px' }}>
                        <button onClick={() => func('stock')} style={{ width: 'calc(100% - 50px)', height: '30px', border: 8, textDecoration: 'none', color: current == 'stock' ? '#396fae' : '#fff', backgroundColor: current == 'stock' ? '#fff': 'transparent', border: '1px solid #fff', borderRadius: '4px', padding: '0 10px', display: 'flex', justifyContent: "flex-start", alignItems: "center", gap: '4px' }}>
                            <i className="bi bi-box-seam-fill"></i>EM ESTOQUE
                        </button>
                    </li>
                </ul>
            </aside>
        </div>
    )
}