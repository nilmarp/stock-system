import React, { useState, useEffect } from 'react';
import { api } from '../../config/api';
import { toast } from 'react-toastify';
import Chart from 'react-apexcharts';

export default function Home() {
    const [data, setData] = useState([]);
    const [onTimeValue, setOnTimeValue] = useState(0);
    const [expiringValue, setExpiringValue] = useState(0);
    const [arrearsValue, setArrearsValue] = useState(0);
    const [received, setReceived] = useState(0);
    const [chartData, setChartData] = useState(null);
    const [chartOptions, setChartOptions] = useState(null);

    const wdApi = async (url = '', func) => {
        try {
            const response = await api.get(url);
            if (url === '/withdrawn') {
                func(response.data?.rentals);
            } else {
                func(response.data?.rentals?.total);
            }
        } catch (error) {
            console.log({ erro: error?.message, url });
        }
    };

    useEffect(() => {
        wdApi('/withdrawn', setData);
    }, []);

    useEffect(() => {
        wdApi('/withdrawn/ontime', setOnTimeValue);
    }, []);

    useEffect(() => {
        wdApi('/withdrawn/expiring', setExpiringValue);
    }, []);

    useEffect(() => {
        wdApi('/withdrawn/arrears', setArrearsValue);
    }, []);

    useEffect(() => {
        wdApi('/received', setReceived);
    }, []);

    useEffect(() => {
        configChart();
    }, [data]); // Update chart when data changes

    const configChart = () => {
        const dataReducing = data.reduce((acc, obj) => {
            const key = String(obj.end_date).replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1');
            if (!acc[key]) {
                acc[key] = { end_date: key, total: 0 };
            }
            acc[key].total += obj.total_daily_price;
            return acc;
        }, {});

        const arrayData = {
            series: [
                {
                    name: 'Total',
                    data: Object.values(dataReducing).map((e) => Number(e.total.toFixed(2))),
                },
            ],
            options: {
                chart: {
                    type: 'line',
                    height: 400,
                    zoom: {
                        enabled: false
                    }
                },
                xaxis: {
                    categories: Object.keys(dataReducing),
                },
                title: {
                    text: 'Projeção Financeira dos alugueis',
                    align: 'center',
                    style: {
                        fontSize: '16px',
                    },
                },
                legend: {
                    position: 'bottom',
                },
            },
        };

        setChartData(arrayData);
    };

    console.log(chartData);

    const fetchData = async () => {
        try {
            await wdApi('/withdrawn/ontime', setOnTimeValue);
            await wdApi('/withdrawn/expiring', setExpiringValue);
            await wdApi('/withdrawn/arrears', setArrearsValue);
            await wdApi('/withdrawn', setData);
            await wdApi('/received', setReceived);
            toast('Tabela atualizada!', { type: 'info' });
        } catch (error) {
            toast('Houve uma falha ao carregar os dados');
        }
    };

    useEffect(() => {
        console.log({ arrearsValue, expiringValue, onTimeValue });
    }, [arrearsValue, expiringValue, onTimeValue]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                <div
                    className="container-lg"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        alignItems: 'center',
                        '@media (max-width: 768px)': {
                            width: '100vw',
                        },
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <p className="fs-3 text-left">Dashboard</p>
                        <button className="btn btn-primary" onClick={fetchData}>
                            <i className="bi bi-arrow-clockwise"></i>
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
                <h3>Visão Geral da Operação</h3>
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
                            width: '150px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: '10px',
                            padding: '10px',
                        }}
                    >
                        <label>Total</label>
                        <h2>{Number(onTimeValue) + Number(expiringValue) + Number(arrearsValue) + Number(received)}</h2>
                    </div>
                    <div
                        className="card"
                        style={{
                            height: '150px',
                            width: '150px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: '10px',
                            padding: '10px',
                        }}
                    >
                        <label>No prazo</label>
                        <h2>{onTimeValue}</h2>
                    </div>
                    <div
                        className="card"
                        style={{
                            height: '150px',
                            width: '150px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: '10px',
                            padding: '10px',
                        }}
                    >
                        <label>Expirando</label>
                        <h2>{expiringValue}</h2>
                    </div>
                    <div
                        className="card"
                        style={{
                            height: '150px',
                            width: '150px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: '10px',
                            padding: '10px',
                        }}
                    >
                        <label>Atrasados</label>
                        <h2>{arrearsValue}</h2>
                    </div>
                    <div
                        className="card"
                        style={{
                            height: '150px',
                            width: '150px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: '10px',
                            padding: '10px',
                        }}
                    >
                        <label>Recebidos</label>
                        <h2>{received}</h2>
                    </div>
                </div>
                <h3>Visão gráfica</h3>
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
                    {chartData && <Chart options={chartData.options} series={chartData.series} type="line" height={400} />}
                </div>
            </div>
        </div>
    );
}
