import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../config/api";

export function ResumedRents() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {

        try {
            const response = await api.get('/dashboard');

            console.log(response?.data[0])

            
            toast('Dados carregados', { type: 'success' });

            return setData(response?.data[0])

        } catch (error) {

            console.log(error)

            toast('Algo deu errado', { type: 'error' });
        }
    }

    const priceFormat = (item) => {
        return new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
        }).format(item)
    }

    const renderArraySize = (rowData) => {
        return rowData.products.length;
    };

    const getSearch = () => {
        let ndata = data.filter(item => (`${item.client.name.toLowerCase()}`.includes(search.toLowerCase())))
        return ndata
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", width: '100%', alignItems: 'center' }}>
            <div style={{ width: "100%", display: "flex", width: '100%', alignItems: "center", marginTop: "20px" }}>
                <div className="container-lg" style={{
                    display: 'flex', justifyContent: "space-between", width: '100%', alignItems: "center", '@media (max-width: 768px)': {
                        width: '100vw'
                    }
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: '100%', alignItems: "center" }}>
                        <p className="fs-3 text-left">
                            <i class="bi bi-currency-dollar"></i>
                            <i class="bi bi-currency-dollar"></i>
                            Financeiro
                        </p>
                        <button className="btn btn-primary" onClick={() => {
                            fetchData()
                            toast('Tabela atualizada!', { type: 'info' })
                        }}>
                            <i class="bi bi-arrow-clockwise"></i>
                            Atualizar
                        </button>
                    </div>
                </div>
            </div>

            <div
                className="card"
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '10px',
                }}
            >
                <h3>Resumo financeiro</h3>
                <div
                    className="card"
                    style={{
                        height: '40vh',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        padding: '10px',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}
                >
                    <div
                        className="card"
                        style={{
                            height: '150px',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: '10px',
                            padding: '10px',
                        }}
                    >
                        <label>Receita total</label>
                        <h2>{priceFormat(Number(data?.BRUTE_TOTAL_RECEIPT))}</h2>
                    </div>
                    <div
                        className="card"
                        style={{
                            height: '150px',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: '10px',
                            padding: '10px',
                        }}
                    >
                        <label>Receita líquida</label>
                        <h2>{priceFormat(Number(data?.LIQUID_RECEIPT))}</h2>
                    </div>
                    <div
                        className="card"
                        style={{
                            height: '150px',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: '10px',
                            padding: '10px',
                        }}
                    >
                        <label>Desconto</label>
                        <h2>{priceFormat(Number(data?.DISCOUNT))}</h2>
                    </div>
                    <div
                        className="card"
                        style={{
                            height: '150px',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: '10px',
                            padding: '10px',
                        }}
                    >
                        <label>Quantidade de alugueis</label>
                        <h2>{Math.round(Number(data?.RENTAL_QUANTITY))}</h2>
                    </div>
                </div>
                
                <div
                    className="card"
                    style={{
                        height: '40vh',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        padding: '10px',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}
                >
                    <div
                        className="card"
                        style={{
                            height: '150px',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: '10px',
                            padding: '10px',
                        }}
                    >
                        <label>Recebidos</label>
                        <h2>{priceFormat(Number(data?.RECEIVED))}</h2>
                    </div>
                    <div
                        className="card"
                        style={{
                            height: '150px',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: '10px',
                            padding: '10px',
                        }}
                    >
                        <label>Aguardando recebimento</label>
                        <h2>{priceFormat(Number(data?.NOT_RECEIVED))}</h2>
                    </div>
                    <div
                        className="card"
                        style={{
                            height: '150px',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: '10px',
                            padding: '10px',
                        }}
                    >
                        <label>Valores à receber HOJE</label>
                        <h2>{priceFormat(Number(data?.TODAY_RECEIPT))}</h2>
                    </div>
                    <div
                        className="card"
                        style={{
                            height: '150px',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: '10px',
                            padding: '10px',
                        }}
                    >
                        <label>Valores atrasados</label>
                        <h2>{priceFormat(Number(data?.ARREAR_RECEIPT))}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}