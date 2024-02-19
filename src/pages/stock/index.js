import React, { useEffect, useState } from "react";
import { api } from "../../config/api";
import { toast } from "react-toastify";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function Stock() {
    const [data, setData] = useState();
    const [registrated, setRegistrated] = useState(false);
    const [description, setDescription] = useState();
    const [quantityOwned, setQuantityOwned] = useState();
    const [dailyPrice, setDailyPrice] = useState();
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false)
    const [idSelected, setIdSelected] = useState(0)

    useEffect(() => {
        fetchData();
    }, [registrated, showModal]);

    const fetchData = async () => {
        try {
            const response = await api.get('/stock');

            console.log(response?.data?.pages)

            if (response?.data?.pages > 1) {
                let ndata = []

                console.log('entrou1')

                response.data?.data.forEach(element => {

                    console.log(element)
                    ndata.push(element)
                });

                console.log(ndata)

                for (let i = 2; i <= response?.data?.pages; i++) {
                    let res = await api.get(`/stock?page=${i}`)

                    res.data?.data.forEach(element => {
                        console.log(element)
                        ndata.push(element)
                    })
                }
                console.log(ndata)

                return setData(ndata)

            }


            return setData(response?.data?.data);
        } catch (error) {
            console.log(error);
            toast('Algo deu errado', { type: 'error' });
        }
    }


    const resetFilds = () => {
        console.log('EITA');
        setIdSelected('');
        setDescription('');
        setDailyPrice('');
        setQuantityOwned('');

        console.log({
            idSelected, description, dailyPrice, quantityOwned
        })
    }


    const handleSubmit = async () => {
        if (!description || !quantityOwned || !dailyPrice) {
            return toast('Por favor, preencha todas as informações', { type: 'warning' });
        }

        try {
            await api.post('/stock', {
                description,
                quantity_owned: quantityOwned,
                daily_price: dailyPrice
            });

            setShowModal(false);
            setRegistrated(!registrated);
            resetFilds()
            toast('Produto criado com sucesso', { type: 'success' });
        } catch (error) {
            console.log(error);
            toast('Algo deu errado', { type: 'error' });
        }
    }

    const handleEdit = async (e) => {
        setEditMode(true)
        setShowModal(true)
        setIdSelected(e.data.id)
        setDescription(e.data.description)
        setDailyPrice(e.data.daily_price)
        setQuantityOwned(e.data.quantity_owned)

        console.log({ idSelected, description, dailyPrice, quantityOwned })
    }

    const handleEditSubmit = async () => {

        if (!description || !quantityOwned || !dailyPrice) {
            return toast('Por favor, preencha todas as informações', { type: 'warning' });
        }

        try {
            await api.post(`/stock/${idSelected}/edit`, {
                description,
                quantity_owned: quantityOwned,
                daily_price: dailyPrice
            });

            setShowModal(false);
            setEditMode(true)
            setRegistrated(!registrated);
            toast('Alteração concluída!', { type: 'success' });

            resetFilds()
        } catch (error) {
            console.log(error);
            toast('Algo deu errado na alteração', { type: 'error' });
        }

    }

    const priceFormat = (item) => {
        return new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
        }).format(item.daily_price)
    }

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    return (
        <div style={{ display: "flex", flexDirection: "column", width: '100%', alignItems: 'center' }}>
            <div style={{ width: "100%", display: "flex", marginTop: "20px" }}>
                <div className="container-lg">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p className="fs-3 text-left">Produtos em Estoque</p>
                        <button
                            type="button"
                            className="btn btn-primary"
                            style={{ height: "40px" }}
                            onClick={() => setShowModal(true)}
                        >
                            <i className="bi bi-folder-plus"></i> NOVO PRODUTO
                        </button>
                    </div>
                </div>
            </div>

            {data &&

                <div className="card" style={{ height: 'calc(100vh - 90px)' }}>
                    <DataTable value={data} scrollable scrollHeight="calc(100vh - 170px)" selectionMode="single" paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '60rem' }}
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                        onRowSelect={handleEdit}
                        sortField="id" sortOrder={1}>
                        <Column field="id" header="ID" style={{ width: '20%' }}></Column>
                        <Column field="description" header="Descrição" style={{ width: '20%' }}></Column>
                        <Column field="quantity_owned" header="Quantidade própria" style={{ width: '20%' }}></Column>
                        <Column field="quantity" header="Quantidade" style={{ width: '20%' }}></Column>
                        <Column field="daily_price" header="Diária" body={priceFormat} style={{ width: '20%' }}></Column>
                    </DataTable>
                </div>
            }

            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{editMode ? 'ALTERANDO PRODUTO' : 'NOVO PRODUTO'}</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}