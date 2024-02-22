// import React, { useEffect, useState } from "react";
// import { api } from "../../config/api";
// import { toast } from "react-toastify";
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';

// export default function Received() {
//     const [data, setData] = useState([]);
//     const [registrated, setRegistrated] = useState(false);
//     const [description, setDescription] = useState();
//     const [quantityOwned, setQuantityOwned] = useState();
//     const [dailyPrice, setDailyPrice] = useState();
//     const [showModal, setShowModal] = useState(false);
//     const [editMode, setEditMode] = useState(false)
//     const [idSelected, setIdSelected] = useState(0)
//     const [search, setSearch] = useState('')

//     const [onTimeQuantity, setOnTimeQuantity] = useState(0)
//     const [expiringQuantity, setExpiringQuantity] = useState(0)
//     const [arrearsQuantity, setArrearsQuantity] = useState(0)

//     useEffect(async () => {
//         try {

//             setOnTimeQuantity(await api.get('/withdrawn/ontime'))
//             setExpiringQuantity(await api.get('/withdrawn/expiring'))
//             setArrearsQuantity(await api.get('/withdrawn/arrears'))



//         } catch (error) {
//             toast('Houve um erro no servidor... \n Já estamos estabilizando isso')
//         }
//     }, [])

//     useEffect(() => {
//         fetchData();
//     }, [registrated, showModal]);

//     const fetchData = async () => {
//         try {
//             const response = await api.get('/withdrawn/ontime');

//             console.log(response?.data?.pages)

//             if (response?.data?.pages > 1) {
//                 let ndata = []

//                 console.log('entrou1')

//                 response.data?.data.forEach(element => {

//                     console.log(element)
//                     ndata.push(element)
//                 });

//                 console.log(ndata)

//                 for (let i = 2; i <= response?.data?.pages; i++) {
//                     let res = await api.get(`/stock?page=${i}`)

//                     res.data?.data.forEach(element => {
//                         console.log(element)
//                         ndata.push(element)
//                     })
//                 }
//                 console.log(ndata)

//                 return setData(ndata)

//             }


//             return setData(response?.data?.data);
//         } catch (error) {
//             console.log(error);
//             toast('Algo deu errado', { type: 'error' });
//         }
//     }


//     const resetFilds = () => {
//         console.log('EITA');
//         setIdSelected('');
//         setDescription('');
//         setDailyPrice('');
//         setQuantityOwned('');

//         console.log({
//             idSelected, description, dailyPrice, quantityOwned
//         })
//     }


//     const handleSubmit = async () => {
//         if (!description || !quantityOwned || !dailyPrice) {
//             return toast('Por favor, preencha todas as informações', { type: 'warning' });
//         }

//         try {
//             await api.post('/stock', {
//                 description,
//                 quantity_owned: quantityOwned,
//                 daily_price: dailyPrice
//             });

//             setShowModal(false);
//             setRegistrated(!registrated);
//             resetFilds()
//             toast('Produto criado com sucesso', { type: 'success' });
//         } catch (error) {
//             console.log(error);
//             toast('Algo deu errado', { type: 'error' });
//         }
//     }

//     const handleEdit = async (e) => {
//         setEditMode(true)
//         setShowModal(true)
//         setIdSelected(e.data.id)
//         setDescription(e.data.description)
//         setDailyPrice(e.data.daily_price)
//         setQuantityOwned(e.data.quantity_owned)

//         console.log({ idSelected, description, dailyPrice, quantityOwned })
//     }

//     const handleEditSubmit = async () => {

//         if (!description || !quantityOwned || !dailyPrice) {
//             return toast('Por favor, preencha todas as informações', { type: 'warning' });
//         }

//         try {
//             await api.post(`/stock/${idSelected}/edit`, {
//                 description,
//                 quantity_owned: quantityOwned,
//                 daily_price: dailyPrice
//             });

//             setShowModal(false);
//             setEditMode(true)
//             setRegistrated(!registrated);
//             toast('Alteração concluída!', { type: 'success' });

//             resetFilds()
//         } catch (error) {
//             console.log(error);
//             toast('Algo deu errado na alteração', { type: 'error' });
//         }

//     }

//     const priceFormat = (item) => {
//         return new Intl.NumberFormat('pt-br', {
//             style: 'currency',
//             currency: 'BRL',
//         }).format(item.daily_price)
//     }

//     const getSearch = () => {
//         let ndata = data.filter(item => ((`${item.description} ${item.daily_price} ${item.description} ${item.quantity_owned}`).toLowerCase().includes(search.toLowerCase())))
//         return ndata
//     }

//     const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
//     const paginatorRight = <Button type="button" icon="pi pi-download" text />;

//     return (
//         <div style={{ display: "flex", flexDirection: "column", width: '100%', alignItems: 'center' }}>
//             <div style={{ width: "100%", display: "flex", width: '100%', alignItems: "center", marginTop: "20px" }}>
//                 <div className="container-lg" style={{
//                     display: 'flex', justifyContent: "space-between", width: '100%', alignItems: "center", '@media (max-width: 768px)': {
//                         width: '100vw'
//                     }
//                 }}>
//                     <div style={{ display: "flex", justifyContent: "space-between", width: '100%', alignItems: "center" }}>
//                         <p className="fs-3 text-left">Dashboard</p>
//                         <button
//                             type="button"
//                             className="btn btn-primary"
//                             style={{ height: "40px" }}
//                             onClick={() => setShowModal(true)}
//                         >
//                             <i className="bi bi-folder-plus"></i> NOVO PRODUTO
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {1 &&

//                 <div className="card" style={{ height: 'calc(100vh - 95px)', width: '100%', display: "flex", flexDirection: 'column', gap: '10px', padding: '10px' }}>

//                     <div className="card" style={{ height: '40vh', width: '100%', display: "flex", flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', gap: '4px', padding: '10px', boxShadow: '1px 2px 13px -5px #396fae' }}>
//                         <div style={{ height: '10vh', width: '100%', display: "flex", flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '4px', padding: '10px' }} >
//                             <h3>Retirados</h3>
//                         </div>
//                         <div style={{ height: '30vh', width: '100%', display: "flex", flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', gap: '4px', padding: '10px' }} >
//                             <div className="card" style={{ height: '100px', width: '100px', display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", gap: '4px', padding: '10px', boxShadow: '1px 2px 13px -5px #396fae' }}>
//                                 <label>Total</label>
//                                 <h3>{onTimeQuantity + expiringQuantity + arrearsQuantity}</h3>
//                             </div>
//                             <div className="card" style={{ height: '100px', width: '100px', display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", gap: '4px', padding: '10px', boxShadow: '1px 2px 13px -5px #396fae' }}>
//                                 <label>No prazo</label>
//                                 <h3>{onTimeQuantity}</h3>
//                             </div>
//                             <div className="card" style={{ height: '100px', width: '100px', display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", gap: '4px', padding: '10px', boxShadow: '1px 2px 13px -5px #396fae' }}>
//                                 <label>Expirando</label>
//                                 <h3>{expiringQuantity}</h3>
//                             </div>
//                             <div className="card" style={{ height: '100px', width: '100px', display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", gap: '4px', padding: '10px', boxShadow: '1px 2px 13px -5px #396fae' }}>
//                                 <label>Atrasados</label>
//                                 <h3>{arrearsQuantity}</h3>
//                             </div>
//                         </div>
//                     </div>
//                     <div style={{ display: "flex", gap: '10px' }}>

//                         <div className="card" style={{ height: '40vh', width: '40vw', display: "flex", flexDirection: 'column', gap: '4px', padding: '10px', boxShadow: '1px 2px 13px -5px #396fae' }}>

//                         </div>

//                         <div className="card" style={{ height: '40vh', width: '40vw', display: "flex", flexDirection: 'column', gap: '4px', padding: '10px', boxShadow: '1px 2px 13px -5px #396fae' }}>

//                         </div>
//                     </div>
//                 </div>
//             }

//             <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none', boxShadow: '1px 2px 13px -5px #396fae', backgroundColor: 'rgba(57, 111, 174, 0.2)' }} tabIndex="-1">
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title">{editMode ? 'ALTERANDO PRODUTO' : 'NOVO PRODUTO'}</h5>
//                             <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
//                         </div>
//                         <div className="modal-body">
//                             <form>
//                                 <div className="d-flex flex-row justify-content-center" style={{ gap: '4px' }}>
//                                     <div className="col-6">
//                                         <label htmlFor="modalName" className="form-label">Nome</label>
//                                         <input type="text" className="form-control" id="modalName" value={description} onChange={(e) => setDescription(e.target.value)} />
//                                     </div>
//                                     <div className="col-3">
//                                         <label htmlFor="modalName" className="form-label">Quantidade</label>
//                                         <input type="number" className="form-control" name="quantity_owned" value={quantityOwned} id="modalName" onChange={(e) => setQuantityOwned(e.target.value)} required />
//                                     </div>
//                                     <div className="col-3">
//                                         <label htmlFor="modalName" className="form-label">Diária</label>
//                                         <input type="number" className="form-control" name="daily_price" id="modalName" value={dailyPrice} onChange={(e) => setDailyPrice(e.target.value)} required />
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                         <div className="modal-footer">
//                             {!editMode && <button type="button" className="btn btn-primary" onClick={handleSubmit}>Cadastrar Produto</button>}
//                             {editMode && <button type="button" className="btn btn-primary" onClick={handleEditSubmit}>Salvar alteração</button>}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useEffect, useState } from "react";
import { api } from "../../config/api";
import { toast } from "react-toastify";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function Home() {
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

    const getSearch = () => {
        let ndata = data.filter(item => (item.description.toLowerCase().includes(search.toLowerCase())))
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
                        <p className="fs-3 text-left">Dashboard</p>
                        <button
                            type="button"
                            className="btn btn-primary"
                            style={{ height: "40px" }}
                            onClick={() => setShowModal(true)}
                        >
                            <i className="bi bi-load-plus"></i> Atualizar
                        </button>
                    </div>
                </div>
            </div>

            {data &&

                <div className="card" style={{ height: 'calc(100vh - 90px)', width: '100%', display: "flex", flexDirection: 'column', gap: '10px', padding: '10px' }}>
                    {/* <div className="d-flex flex-row justify-content-right" style={{ gap: '4px' }}>
                        <div className="col-8">
                            <input type="text" placeholder="Busque aqui . . ." className="form-control" id="modalName" value={description} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                    <DataTable value={search != '' ? getSearch() : data} scrollable scrollHeight="calc(100vh - 170px)" selectionMode="single" paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '60rem' }}
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                        onRowSelect={handleEdit}
                        sortField="id" sortOrder={1}>
                        <Column field="id" header="ID" style={{ width: '20%' }}></Column>
                        <Column field="description" header="Descrição" style={{ width: '20%' }}></Column>
                        <Column field="quantity_owned" header="Quantidade própria" style={{ width: '20%' }}></Column>
                        <Column field="quantity" header="Quantidade" style={{ width: '20%' }}></Column>
                        <Column field="daily_price" header="Diária" body={priceFormat} style={{ width: '20%' }}></Column>
                    </DataTable> */}
                    <h3>Retirados</h3>
                    <div className="card" style={{ height: '40vh', width: '100%', display: "flex", flexDirection: 'row', gap: '10px', padding: '10px', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <div className="card" style={{ height: '150px', width: '150px', display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', gap: '10px', padding: '10px' }}>
                            <label>Total</label>
                            <h2>10</h2>
                        </div>
                        <div className="card" style={{ height: '150px', width: '150px', display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', gap: '10px', padding: '10px' }}>
                            <label>No prazo</label>
                            <h2>10</h2>
                        </div>
                        <div className="card" style={{ height: '150px', width: '150px', display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', gap: '10px', padding: '10px' }}>
                            <label>Expirando</label>
                            <h2>0</h2>
                        </div>
                        <div className="card" style={{ height: '150px', width: '150px', display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', gap: '10px', padding: '10px' }}>
                            <label>Atrasados</label>
                            <h2>0</h2>
                        </div>
                    </div>
                </div>
            }

            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none', boxShadow: '1px 2px 13px -5px #396fae', backgroundColor: 'rgba(57, 111, 174, 0.2)' }} tabIndex="-1">
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