import React, { useEffect, useState } from "react";
import { api } from "../../config/api";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export function RentsPerDay() {
    const [data, setData] = useState();
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        try {
            const response = await api.get('/dashboard/finances/rents');

            console.log(response?.data)

            toast('Tabela de recebidos atualizada!', { type: 'success' });

            return setData(response?.data)

        } catch (error) {

            console.log(error)

            toast('Algo deu errado', { type: 'error' });
        }
    }

    const priceFormat = (item) => {
        return new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
        }).format(item.TOTAL_PRICE)
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
                            Entradas
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
                    <DataTable value={data.length > 0 ? data : []} scrollable scrollHeight="calc(100vh - 270px)" selectionMode="single" paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '60rem' }}
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                        sortField="id" sortOrder={1}>
                        <Column field="DATE_OF_RENT" header="Data de recebimento" style={{ width: '20%' }}></Column>
                        <Column field="TOTAL_PRICE" body={priceFormat} header="Valor" style={{ width: '20%' }}></Column>
                        {/* <Column header="Itens" body={renderArraySize} style={{ width: '20%' }}></Column>
                        <Column field="client.reference" header="Referência" style={{ width: '20%' }}></Column>
                        <Column field="end_date" header="Prazo" style={{ width: '20%' }}></Column> */}
                    </DataTable>
                </div>
            }
        </div>
    );
}