import React, { useEffect, useState } from "react";
import { api } from "../../../config/api";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { toast } from "react-toastify";

export default function OnTime() {

    const [onTime, setOnTime] = useState([]); // Inicialize como um array vazio
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await api.get('/withdrawn/ontime');

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
                        let res = await api.get(`/withdrawn/ontime?page=${i}`)

                        res.data?.rentals?.data.forEach(element => {
                            console.log(element)
                            ndata.push(element)
                        })
                    }
                    console.log(ndata)

                    return setOnTime(ndata)

                }


                return setOnTime(response?.data?.rentals?.data);
            } catch (error) {
                console.log(error);
                toast('Algo deu errado', { type: 'error' });
            }
        }
        fetchData();
    }, []);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    const renderArraySize = (rowData) => {
        return rowData.products.length;
    };

    const getSearch = () => {
        let ndata = onTime.filter(item => (`${item.client.name.toLowerCase()}`.includes(search.toLowerCase())))
        return ndata
    }

    return (
        <div className="card" style={{borderTopLeftRadius: 0, height: 'calc(100vh - 90px)', width: '100%', display: "flex", flexDirection: 'column', gap: '10px', padding: '10px' }}>
            <h3>No prazo</h3>
            <div className="d-flex flex-row justify-content-right" style={{ gap: '4px' }}>
                <div className="col-8">
                    <input type="text" placeholder="Busque aqui . . ." className="form-control" id="modalName" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <DataTable value={search != '' ? getSearch() : onTime} scrollable scrollHeight="calc(100vh - 270px)" selectionMode="single" paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '60rem' }}
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
    );
}
