import { DataTable } from "primereact/datatable";
import React from "react";
import { toast } from "react-toastify";
import { Column } from "typeorm";
import { api } from "../../config/api";

export default function RentView({ func, data }) {

    console.log(data)

    const priceFormat = (item) => {
        return new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
        }).format(item.daily_price)
    }

    const handleReceiveRent = async () => {
        try {
            await api.post(`/withdrawn/${data.id}/receive`)
            func(false)
            return toast(`Itens de aluguel recebidos com sucesso`, { type: "success" })
        } catch (error) {
            return toast(`Houve uma falha ao concluir a operação`)
        }
    }
    const handleDeleteRent = async () => {
        try {
            await api.post(`/withdrawn/${data.id}/delete`)
            func(false)
            return toast(`Itens de aluguel recebidos com sucesso`, { type: "success" })
        } catch (error) {
            return toast(`Houve uma falha ao concluir a operação`)
        }
    }

    return (
        <div className={"modal"} style={{ display: 'block', boxShadow: '1px 2px 13px -5px #396fae', backgroundColor: 'rgba(57, 111, 174, 0.2)' }}>
            <div className="modal-dialog" style={{ maxWidth: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="modal-content" style={{ width: 'calc(90vw - 300px)' }}>
                    <div className="modal-header">
                        <h5 className="modal-title">Visualizar Aluguel</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => { func(false); }}></button>
                    </div>
                    <div className="modal-body" style={{ height: 'calc(90vh - 150px)' }}>
                        <div className="row">
                            <div className="card">
                                <div className="row">
                                    <h6>Informações do cliente</h6>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <strong>
                                            <label htmlFor="modalName" className="form-label">Cliente</label>
                                        </strong>
                                        <p>{data?.client?.name} {data?.client?.surname}</p>
                                    </div>
                                    <div className="col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                                        <div style={{ backgroundColor: data?.client?.completed ? 'green' : 'blue', color: '#fff', height: '30px', borderRadius: '8px', width: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {data?.completed ? 'Concluído' : 'Em andamento'}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <strong>
                                            <label htmlFor="modalName" className="form-label">Telefone</label>
                                        </strong>
                                        <p>{data?.client?.phone}</p>
                                    </div>
                                    <div className="col">
                                        <strong>
                                            <label htmlFor="modalName" className="form-label">Email</label>
                                        </strong>
                                        <p>{data?.client?.email}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <strong>
                                            <label htmlFor="modalName" className="form-label">Endereço</label>
                                        </strong>
                                        <p>{data?.client?.address}</p>
                                    </div>
                                    <div className="col-3">
                                        <strong>
                                            <label htmlFor="modalName" className="form-label">Número</label>
                                        </strong>
                                        <p>{data?.client?.building_number}</p>
                                    </div>
                                    <div className="col-3">
                                        <strong>
                                            <label htmlFor="modalName" className="form-label">Número</label>
                                        </strong>
                                        <p>{data?.client?.building_number}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <DataTable value={data?.products || []} scrollable scrollHeight="208px" selectionMode="single" paginator rows={5} rowsPerPageOptions={[5, 10]} tableStyle={{ minWidth: '300px' }}
                                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                sortField="id" sortOrder={1}>
                                <Column field="id" header="ID" style={{ width: '20%' }}></Column>
                                <Column field="product.description" header="Produto" style={{ width: '20%' }}></Column>
                                <Column field="product_quantity" header="Qtd" style={{ width: '20%' }}></Column>
                                <Column field="daily_price" header="Valor" body={priceFormat} style={{ width: '20%' }}></Column>
                            </DataTable>
                        </div>
                    </div>
                    <div className="modal-footer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <button type="button" className="btn btn-danger" onClick={()=>handleDeleteRent()}>Cancelar</button>
                        <button type="button" className="btn btn-success" onClick={()=>handleReceiveRent()} >Receber</button>
                    </div>
                </div>
            </div>
        </div>
    )
}