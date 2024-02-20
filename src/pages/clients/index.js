import React, { useEffect, useState } from "react";
import { api } from "../../config/api";
import { toast } from "react-toastify";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function Clients() {
    const [data, setData] = useState([]);
    const [registrated, setRegistrated] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false)
    const [idSelected, setIdSelected] = useState(0)
    const [search, setSearch] = useState('')

    // campos do modal
    
    const [name, setName]               = useState()
    const [lastname, setLastname]       = useState()
    const [phone, setPhone]             = useState()
    const [email, setEmail]             = useState()
    const [CEP, setCEP]                 = useState()
    const [city, setCity]               = useState()
    const [address, setAddress]         = useState()
    const [number, setNumber]           = useState()
    const [document, setDocument]       = useState()
    const [reference, setReference]     = useState()

    useEffect(() => {
        fetchData();
    }, [registrated, showModal]);

    const fetchData = async () => {
        try {
            const response = await api.get('/');

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
                    let res = await api.get(`/?page=${i}`)

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
        setName('');
        setLastname('');
        setPhone('');
        setEmail('');
        setCEP('');
        setCity('');
        setAddress('');
        setNumber('');
        setDocument('');
        setReference('');
    }


    const handleSubmit = async () => {
        if (!name || !lastname || !phone || !email || !CEP || !city || !address || !number || !document || !reference) {
            return toast('Por favor, preencha todas as informações', { type: 'warning' });
        }

        try {
            await api.post('/stock', {
                name,
                surname: lastname,
                identification_number: document, // CPF ou CNPJ
                city,
                cep: CEP,
                address,
                building_number: number,
                email,
                phone,
                reference
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
        setName(e.data.name);
        setLastname(e.data.surname);
        setPhone(e.data.phone);
        setEmail(e.data.email);
        setCEP(e.data.cep);
        setCity(e.data.city);
        setAddress(e.data.address);
        setNumber(e.data.building_number);
        setDocument(e.data.identification_number);
        setReference(e.data.reference);

    }

    const handleEditSubmit = async () => {

        if (!name || !lastname || !phone || !email || !CEP || !city || !address || !number || !document || !reference) {
            return toast('Por favor, preencha todas as informações', { type: 'warning' });
        }

        try {
            await api.post(`/stock/${idSelected}/edit`, {
                name,
                surname: lastname,
                identification_number: document, // CPF ou CNPJ
                city,
                cep: CEP,
                address,
                building_number: number,
                email,
                phone,
                reference
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
        let ndata = data.filter(item => ((`${item.name.toLowerCase()} ${item.surname.toLowerCase()} ${item.address.toLowerCase()} ${item.identification_number.toLowerCase()} ${item.email.toLowerCase()}`).includes(search.toLowerCase())))
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
                        <p className="fs-3 text-left">Clientes</p>
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

                <div className="card" style={{ height: 'calc(100vh - 90px)', width: '100%', display: "flex", flexDirection: 'column', gap: '10px', padding: '10px' }}>
                    <div className="d-flex flex-row justify-content-right" style={{ gap: '4px' }}>
                        <div className="col-8">
                            <input type="text" placeholder="Busque aqui . . ." className="form-control" id="modalName" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                    <DataTable value={search != '' ? getSearch() : data} scrollable scrollHeight="calc(100vh - 170px)" selectionMode="single" paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '60rem' }}
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                        onRowSelect={handleEdit}
                        sortField="id" sortOrder={1}>
                        <Column field="id" header="ID" style={{ width: '20%' }}></Column>
                        <Column field="name" header="Descrição" style={{ width: '20%' }}></Column>
                        <Column field="identification_number" header="Quantidade própria" style={{ width: '20%' }}></Column>
                        <Column field="city" header="Quantidade" style={{ width: '20%' }}></Column>
                        <Column field="phone" header="Diária" style={{ width: '20%' }}></Column>
                    </DataTable>
                </div>
            }

            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none', boxShadow: '1px 2px 13px -5px #396fae' }} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{editMode ? 'ALTERANDO CLIENTE' : 'NOVO CLIENTE'}</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="modalName" className="form-label">Nome</label>
                                        <input type="text" className="form-control" id="modalName" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="modalName" className="form-label">Sobrenome</label>
                                        <input type="number" className="form-control" name="quantity_owned" value={lastname} id="modalName" onChange={(e) => setLastname(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="modalName" className="form-label">CPF / CNPJ</label>
                                        <input type="text" className="form-control" id="modalName" value={document} onChange={(e) => setDocument(e.target.value)} />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="modalName" className="form-label">Referência</label>
                                        <input type="number" className="form-control" name="quantity_owned" value={reference} id="modalName" onChange={(e) => setReference(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="modalName" className="form-label">Telefone</label>
                                        <input type="text" className="form-control" id="modalName" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="modalName" className="form-label">Email</label>
                                        <input type="number" className="form-control" name="quantity_owned" value={email} id="modalName" onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="modalName" className="form-label">CEP</label>
                                        <input type="text" className="form-control" id="modalName" value={CEP} onChange={(e) => setCEP(e.target.value)} />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="modalName" className="form-label">Cidade</label>
                                        <input type="number" className="form-control" name="quantity_owned" value={city} id="modalName" onChange={(e) => setCity(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="modalName" className="form-label">Endereço</label>
                                        <input type="text" className="form-control" id="modalName" value={address} onChange={(e) => setAddress(e.target.value)} />
                                    </div>
                                    <div className="col-3">
                                        <label htmlFor="modalName" className="form-label">Número</label>
                                        <input type="number" className="form-control" name="quantity_owned" value={number} id="modalName" onChange={(e) => setNumber(e.target.value)} required />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            {!editMode && <button type="button" className="btn btn-primary" onClick={handleSubmit}>Cadastrar cliente</button>}
                            {editMode && <button type="button" className="btn btn-primary" onClick={handleEditSubmit}>Salvar alteração</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}