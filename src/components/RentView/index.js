import { DataTable } from "primereact/datatable";
import React from "react";
import { toast } from "react-toastify";
import { Column } from "typeorm";
import { api } from "../../config/api";
import { IMaskInput } from "react-imask";

export default function RentView({ func, data }) {


    const priceFormat = (item) => {
        return new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
        }).format(item.daily_price)
    }

    const priceFormatTotal = (item) => {
        console.log(item)
        // console.log(item?.total_daily_price)
        return new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
        }).format(item)
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
            return toast(`Registro de aluguel deletado`, { type: "success" })
        } catch (error) {
            return toast(`Houve uma falha ao concluir a operação`)
        }
    }

    const calcBetweenTwoDates = (start = '', end = '') => {

        const format1 = (value = '') => {
            var dt = value.split('/')
            return `${dt[2]}-${dt[0]}-${dt[1]}`
        }

        const format2 = (value = '') => {
            var dt = value.split('/')
            return `${dt[2]}-${dt[1]}-${dt[0]}`
        }


        if (new Date(format1(end)) == new Date(format1(start)) && !(new Date(format1(end)) != 'Invalid Date' || new Date(format1(start)) != 'Invalid Date')) {
            return 1
        }

        if (new Date(format1(end)) != 'Invalid Date' && new Date(format1(start)) != 'Invalid Date') {
            console.log('UMM');
            const diffTime = new Date(format1(end)) - new Date(format1(start));
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return Number(diffDays) + 1;
        }


        console.log('DOIS');
        const diffTime = new Date(format2(end)) - new Date(format2(start));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Number(diffDays) + 1;

    }

    const formatToCalcDate = (value = '') => {
        var dt = value.split('/')
        return `${dt[2]}-${dt[0]}-${dt[1]}`
    }

    console.log(data)

    console.log(data?.start_date)
    console.log(formatToCalcDate(data?.start_date))
    console.log(new Date(formatToCalcDate(data?.start_date)))

    return (
        <div className={"modal"} style={{ display: 'block', boxShadow: '1px 2px 13px -5px #396fae', backgroundColor: 'rgba(57, 111, 174, 0.2)' }}>
            <div className="modal-dialog" style={{ maxWidth: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="modal-content" style={{ width: 'calc(90vw - 200px)' }}>
                    <div className="modal-header">
                        <h5 className="modal-title">Visualizar Aluguel</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => { func(false); }}></button>
                    </div>
                    <div className="modal-body" style={{ height: 'calc(100vh - 150px)' }}>
                        <div className="row">
                            <div className="card" style={{ padding: 8}}>
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
                                        <div style={{ backgroundColor: data?.client?.completed ? 'green' : (new Date() > new Date(data?.end_date) ? 'red' : 'blue'), color: '#fff', height: '30px', borderRadius: '8px', width: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {data?.completed ? 'Concluído' : (new Date() > new Date(data?.end_date) ? 'Atrasado' : 'Em andamento')}
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
                                        <p>{data?.client?.address}, {data?.client?.building_number}</p>
                                    </div>
                                    <div className="col-3">
                                        <strong>
                                            <label htmlFor="modalName" className="form-label">Início</label>
                                        </strong>
                                        <IMaskInput type={'date'} className="form-control" value={data?.start_date} disabled />
                                    </div>
                                    <div className="col-3">
                                        <strong>
                                            <label htmlFor="modalName" className="form-label">Fim</label>
                                        </strong>
                                        <IMaskInput type={'date'} className="form-control" value={data?.end_date} disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <DataTable value={data?.products || []} scrollable scrollHeight="200px" selectionMode="single" paginator rows={5} rowsPerPageOptions={[5, 10]} tableStyle={{ minWidth: '300px' }}
                                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                currentPageReportTemplate="Item {first} ao {last} de {totalRecords}"
                                sortField="id" sortOrder={1}>
                                <Column field="id"                  header="ID"                             style={{ width: '20%' }}></Column>
                                <Column field="product.description" header="Produto"                        style={{ width: '20%' }}></Column>
                                <Column field="product_quantity"    header="Qtd"                            style={{ width: '20%' }}></Column>
                                {/* <Column field="daily_value"         header="Diária"     body={priceFormat}  style={{ width: '20%' }}></Column> */}
                                <Column field="daily_price"         header="Total"      body={priceFormat}  style={{ width: '20%' }}></Column>
                            </DataTable>
                        </div>
                    </div>
                    <div className="modal-footer" style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                        <button type="button" className="btn btn-danger" onClick={() => handleDeleteRent()}>Cancelar</button>
                        {/* <h1>{calcBetweenTwoDates(data?.start_date, data?.end_date)}</h1> */}
                        <h5>{priceFormatTotal(Number(data?.total_daily_price) * calcBetweenTwoDates(data?.start_date, data?.end_date))}</h5>
                        <button type="button" className="btn btn-success" onClick={() => handleReceiveRent()} >Receber</button>
                    </div>
                </div>
            </div>
        </div>
    )
}