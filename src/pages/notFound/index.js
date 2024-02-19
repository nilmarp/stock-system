import React from "react";

export default function NotFound({ func }) {
    return (
        <section style={{ width: "100vw", height: "calc(100vh - 130px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "helvetica" }}>
            <div style={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center" }}>
                <img src="public\notfound.png" width={250} height={250} />
                <h1>Opa! Tela não encontrada</h1>
                <p>Por favor, clique no botão abaixo para ser redirecionado pra tela inicial</p>
                <button onClick={() => func('home')} style={{ display: "flex", backgroundColor: "blue", width: "16vw", height: "6vh", borderRadius: "8px", alignItems: "center", justifyContent: "center", color: '#fff', fontSize: '2rem' }}>
                    Ir para o Inicio
                </button>
            </div>
        </section>
    );
}
