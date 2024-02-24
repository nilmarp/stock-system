import React, { useEffect, useState } from "react";
import { api } from "../../config/api";
import { toast } from "react-toastify";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function Received() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {

        try {
            const response = await api.get('/received');

            console.log(response?.data?.rentals?.pages)

            if (response?.data?.rentals?.pages > 1) {
                let ndata = []

                console.log('entrou1')

                response.data?.rentals?.data.forEach(element => {

                    console.log(element)
                    ndata.push(element)
                });

                console.log(ndata)

                for (let i = 2; i <= response?.data?.rentals?.pages; i++) {
                    let res = await api.get(`/received?page=${i}`)

                    res.data?.rentals?.data.forEach(element => {
                        console.log(element)
                        ndata.push(element)
                    })
                }
                console.log(ndata)

                return setData(ndata)

            }

            return setData(response?.data?.rentals?.data);
        } catch (error) {
            console.log(error);
            toast('Algo deu errado', { type: 'error' });
        }
    }

    const priceFormat = (item) => {
        return new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
        }).format(item.daily_price)
    }

    const renderArraySize = (rowData) => {
        return rowData.products.length;
    };

    const getSearch = () => {
        let ndata = data.filter(item => (`${item.client.name.toLowerCase()}`.includes(search.toLowerCase())))
        return ndata
    }

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

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
                            <i class="bi bi-arrow-bar-down"></i>
                            Recebidos
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

            {data &&

                <div className="card" style={{ height: 'calc(100vh - 90px)', width: '100%', display: "flex", flexDirection: 'column', gap: '10px', padding: '10px' }}>
                    <div className="d-flex flex-row justify-content-right" style={{ gap: '4px' }}>
                        <div className="col-8">
                            <input type="text" placeholder="Busque aqui . . ." className="form-control" id="modalName" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                    <DataTable value={search != '' ? getSearch() : data} scrollable scrollHeight="calc(100vh - 270px)" selectionMode="single" paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '60rem' }}
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                        sortField="id" sortOrder={1}>
                        <Column field="id" header="ID" style={{ width: '20%' }}></Column>
                        <Column field="client.name" header="Cliente" style={{ width: '20%' }}></Column>
                        <Column header="Itens" body={renderArraySize} style={{ width: '20%' }}></Column>
                        <Column field="client.reference" header="Referência" style={{ width: '20%' }}></Column>
                        <Column field="end_date" header="Prazo" style={{ width: '20%' }}></Column>
                    </DataTable>
                </div>
            }
        </div>
    );
}