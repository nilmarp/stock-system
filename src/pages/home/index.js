import React, { useEffect, useState } from "react";
import { api } from "../../config/api";
import { toast } from "react-toastify";
import { Chart } from "primereact/chart";

export default function Home() {
    const [data, setData] = useState([]);
    const [onTimeValue, setOnTimeValue] = useState(0);
    const [expiringValue, setExpiringValue] = useState(0);
    const [arrearsValue, setArrearsValue] = useState(0);
    const [received, setReceived] = useState(0);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

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
        wdApi('/withdrawn/ontime', setOnTimeValue)
    }, [])


    useEffect(() => {
        wdApi('/withdrawn/expiring', setExpiringValue)
    }, [])


    useEffect(() => {
        wdApi('/withdrawn/arrears', setArrearsValue)
    }, [])

    useEffect(() => {
        wdApi('/received', setReceived)
    }, [])

    useEffect(() => {
        configChart();
    }, [data]); // Update chart when data changes

    const configChart = () => {
        const dataReducing = data.reduce((acc, obj) => {
            const key = obj.end_date;
            if (!acc[key]) {
                acc[key] = { end_date: key, total: 0 };
            }
            acc[key].total += obj.total_daily_price;
            return acc;
        }, {});
        
        var arrayData = {
            labels: Object.keys(dataReducing),
            datasets: [
                {
                    label: 'First Dataset',
                    data: Object.values(dataReducing).map((e) => Number(e.total.toFixed(2))),
                    fill: false,
                    borderColor: '#129848',
                    tension: 0.4
                }
            ]
        };

        var options = {
            plugins: {
                title: {
                    display: true,
                    text: 'Projeção de valores',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    position: 'bottom'
                }
            }
        };

        setChartData(arrayData);
        setChartOptions(options);
    };

    console.log(chartData);
    console.log(chartOptions);

    const fetchData = () => {
        try {
            wdApi('/withdrawn/ontime', setOnTimeValue);
            wdApi('/withdrawn/expiring', setExpiringValue);
            wdApi('/withdrawn/arrears', setArrearsValue);
            wdApi('/withdrawn', setData);
            wdApi('/received', setReceived);
            toast('Tabela atualizada!', { type: 'info' });
        } catch (error) {
            toast('Houve uma falha ao carregar os dados');
        }
    };

    useEffect(() => {
        console.log({ arrearsValue, expiringValue, onTimeValue });
    }, [arrearsValue, expiringValue, onTimeValue]);

    return (
        <div style={{ display: "flex", flexDirection: "column", width: '100%', alignItems: 'center' }}>
            <div style={{ width: "100%", display: "flex", width: '100%', alignItems: "center", marginTop: "20px" }}>
                <div className="container-lg" style={{
                    display: 'flex', justifyContent: "space-between", width: '100%', alignItems: "center", '@media (max-width: 768px)': {
                        width: '100vw'
                    }
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: '100%', alignItems: "center" }}>
                        <p className="fs-3 text-left">Dashboard</p>
                        <button className="btn btn-primary" onClick={fetchData}>
                            <i className="bi bi-arrow-clockwise"></i>
                            Atualizar
                        </button>
                    </div>
                </div>
            </div>
            <div className="card" style={{ height: 'calc(100vh - 90px)', width: '100%', display: "flex", flexDirection: 'column', gap: '10px', padding: '10px' }}>
                <h3>Retirados</h3>
                <div className="card" style={{ height: '40vh', width: '100%', display: "flex", flexDirection: 'row', gap: '10px', padding: '10px', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <div className="card" style={{ height: '150px', width: '150px', display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', gap: '10px', padding: '10px' }}>
                        <label>Total</label>
                        <h2>{Number(onTimeValue) + Number(expiringValue) + Number(arrearsValue) + Number(received)}</h2>
                    </div>
                    <div className="card" style={{ height: '150px', width: '150px', display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', gap: '10px', padding: '10px' }}>
                        <label>No prazo</label>
                        <h2>{onTimeValue}</h2>
                    </div>
                    <div className="card" style={{ height: '150px', width: '150px', display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', gap: '10px', padding: '10px' }}>
                        <label>Expirando</label>
                        <h2>{expiringValue}</h2>
                    </div>
                    <div className="card" style={{ height: '150px', width: '150px', display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', gap: '10px', padding: '10px' }}>
                        <label>Atrasados</label>
                        <h2>{arrearsValue}</h2>
                    </div>
                    <div className="card" style={{ height: '150px', width: '150px', display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', gap: '10px', padding: '10px' }}>
                        <label>Recebidos</label>
                        <h2>{received}</h2>
                    </div>
                </div>
            </div>
            <div className="card" style={{ height: 'calc(100vh - 90px)', width: '100%', display: "flex", flexDirection: 'column', gap: '10px', padding: '10px' }}>
                <Chart type="bar" height="400px" width="800px" data={chartData} options={chartOptions} />
            </div>
        </div>
    );
}
