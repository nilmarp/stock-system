import React, { useEffect, useState } from "react";
import { api } from "../../config/api";
import { toast } from "react-toastify";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { IMaskInput } from "react-imask";

export default function Finances() {
    const [data, setData] = useState([]);
    const [registrated, setRegistrated] = useState(false);
    const [description, setDescription] = useState();
    const [quantityOwned, setQuantityOwned] = useState();
    const [dailyPrice, setDailyPrice] = useState();
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false)
    const [idSelected, setIdSelected] = useState(0)
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchData();
    }, [registrated, showModal]);

    const fetchData = async () => {
        try {
            const response = await api.get('/withdrawn/');

            return setData(response?.data?.data);

        } catch (error) {
            console.log(error);
            toast('Algo deu errado', { type: 'error' });
        }
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
                            <i class="bi bi-boxes"></i>
                            Produtos em Estoque
                        </p>
                        <button
                            type="button"
                            className="btn btn-primary"
                            style={{ height: "40px" }}
                            onClick={() => { setShowModal(true); setEditMode(false) }}
                        >
                            <i className="bi bi-box-seam"></i> NOVO PRODUTO
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
                        onRowSelect={handleEdit}
                        sortField="id" sortOrder={1}>
                        <Column field="id" header="ID" style={{ width: '20%' }}></Column>
                        <Column field="description" header="Descrição" style={{ width: '20%' }}></Column>
                        <Column field="quantity_owned" header="Quantidade própria" style={{ width: '20%' }}></Column>
                        <Column field="quantity" header="Quantidade" style={{ width: '20%' }}></Column>
                        <Column field="daily_price" header="Diária" body={priceFormat} style={{ width: '20%' }}></Column>
                        {/* <Column field="daily_price" header="Diária" body={(e)=>{return(<button> Delete : {e?.description}</button>)}} style={{ width: '20%' }}></Column> */}
                    </DataTable>
                </div>
            }

            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none', boxShadow: '1px 2px 13px -5px #396fae', backgroundColor: 'rgba(57, 111, 174, 0.2)' }} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{editMode ? 'ALTERANDO PRODUTO' : 'NOVO PRODUTO'}</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={() => { setShowModal(false); resetFilds(); }}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="d-flex flex-row justify-content-center" style={{ gap: '4px' }}>
                                    <div className="col-6">
                                        <label htmlFor="modalName" className="form-label">Nome</label>
                                        <input type="text" className="form-control" id="modalName" value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </div>
                                    <div className="col-3">
                                        <label htmlFor="modalName" className="form-label">Quantidade</label>
                                        <input type="number" className="form-control" name="quantity_owned" value={quantityOwned} id="modalName" onChange={(e) => setQuantityOwned(e.target.value)} required />
                                    </div>
                                    <div className="col-3">
                                        <label htmlFor="modalName" className="form-label">Diária</label>

                                        <input type="number" className="form-control" name="daily_price" id="modalName" value={dailyPrice} onChange={(e) => setDailyPrice(e.target.value)} required />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            {!editMode && <button type="button" className="btn btn-primary" onClick={handleSubmit}>Cadastrar Produto</button>}
                            {editMode && <button type="button" className="btn btn-primary" onClick={handleEditSubmit}>Salvar alteração</button>}
                            {editMode && <button type="button" className="btn btn-danger" onClick={() => handleDeleteStock(idSelected)}>Excluir</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}