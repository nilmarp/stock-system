import React from "react";

export default function NotFound({func}) {
    return (
        <section style={{ width: "100vw", height: "calc(100vh - 130px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "helvetica" }}>
            <div style={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center" }}>
                <h1>Page Not Found</h1>
                <p>Please, click in the following button to go to homepage</p>
                <button onClick={()=>func('home')} style={{ display: "flex", backgroundColor: "blue", width: "16vw", height: "6vh", borderRadius: "8px", alignItems: "center", justifyContent: "center" }}>
                    Go to homepage
                </button>
            </div>
        </section>
    );
}
