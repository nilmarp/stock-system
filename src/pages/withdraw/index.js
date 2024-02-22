import React, { useEffect, useState } from "react";
import { api } from "../../config/api";
import { toast } from "react-toastify";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import OnTime from "./tabs/onTime";
import Expiring from "./tabs/expiring";
import Arrears from "./tabs/arrears";
import { IMaskInput } from "react-imask";
import QuerySelector from "../../components/QuerySelector";

export default function Withdraw() {

    const [withdrawnTab, setWithdrawnTab] = useState('ontime')

    const [registrated, setRegistrated] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false)
    const [idSelected, setIdSelected] = useState(0)
    const [search, setSearch] = useState('')

    const [products, setProducts] = useState([])
    const [clients, setClients] = useState([])

    // products service

    useEffect(() => {
        fetchProducts();
    }, [registrated, showModal]);

    const fetchProducts = async () => {
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

                return setProducts(ndata)

            }

            return setProducts(response?.data?.data);
        } catch (error) {
            console.log(error);
            toast('Erro ao carregar produtos', { type: 'error' });
        }
    }


    // Clients service

    useEffect(() => {
        fetchClients();
    }, [registrated, showModal]);

    const fetchClients = async () => {
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

                return setClients(ndata)

            }

            return setClients(response?.data?.data);
        } catch (error) {
            console.log(error);
            toast('Erro ao carregar clientes', { type: 'error' });
        }
    }



    const [cart, setCart] = useState([])

    const AddProductHandle = (e) => {
        setCart(
            [...cart,
            {
                product_quantity: 0,
                product_id: 0,

            }
            ]
        )
    }

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [userId, setUserId] = useState(0)

    // computeds
    const [totalDailyPrice, setTotalDailyPrice] = useState(0)

    const updateTotalPrice = () => {
        let totalPrice = 0;
        cart.forEach((item) => {
            let prod = products.find((product) => product?.id == item?.product_id);
            if (prod) {
                totalPrice += Number(prod?.daily_price) * Number(item.product_quantity);
            }
        });
        setTotalDailyPrice(totalPrice);
    };

    useEffect(() => updateTotalPrice(), [cart])


    const resetFilds = () => {
        setTotalDailyPrice(0)
        setStartDate('')
        setEndDate('')
        setCart([])
    }

    let mainBody = {
        start_date: startDate,
        end_date: endDate,
        completed: false,
        products: cart,
        client_id: userId
    };

    const removeItem = (key) => {
        if (key > -1) {
            setCart(cart.toSpliced(key, 1))
        }
    }

    const priceFormat = (item) => {
        return new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
        }).format(item)
    }

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
                            <i class="bi bi-truck"></i>
                            Retirados
                        </p>
                        <button
                            type="button"
                            className="btn btn-primary"
                            style={{ height: "40px" }}
                            onClick={() => { setShowModal(true); setEditMode(false) }}
                        >
                            <i className="bi bi-box-arrow-up"></i> Registrar aluguel
                        </button>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", width: '100%', justifyContent: 'flex-start' }}>
                <button style={{ width: '100px', height: '40px', backgroundColor: withdrawnTab == 'ontime' ? '#0D6EFD' : 'transparent', color: withdrawnTab == 'ontime' ? '#fff' : '#000', borderRadius: '4px', borderBottomRightRadius: '0px', borderBottomLeftRadius: '0px', border: '1px solid #D2D2D2', borderBottom: 'none' }} onClick={() => setWithdrawnTab('ontime')}>No prazo  </button>
                <button style={{ width: '100px', height: '40px', backgroundColor: withdrawnTab == 'expiring' ? '#0D6EFD' : 'transparent', color: withdrawnTab == 'expiring' ? '#fff' : '#000', borderRadius: '4px', borderBottomRightRadius: '0px', borderBottomLeftRadius: '0px', border: '1px solid #D2D2D2', borderBottom: 'none' }} onClick={() => setWithdrawnTab('expiring')}>Vencendo  </button>
                <button style={{ width: '100px', height: '40px', backgroundColor: withdrawnTab == 'arrears' ? '#0D6EFD' : 'transparent', color: withdrawnTab == 'arrears' ? '#fff' : '#000', borderRadius: '4px', borderBottomRightRadius: '0px', borderBottomLeftRadius: '0px', border: '1px solid #D2D2D2', borderBottom: 'none' }} onClick={() => setWithdrawnTab('arrears')}>Atrasados </button>
            </div>
            {withdrawnTab == 'ontime' && <OnTime />}
            {withdrawnTab == 'expiring' && <Expiring />}
            {withdrawnTab == 'arrears' && <Arrears />}background-color: rgba(57, 111, 174, 0.2);

            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none', boxShadow: '1px 2px 13px -5px #396fae', backgroundColor: 'rgba(57, 111, 174, 0.2)' }} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{editMode ? 'Alterando aluguel' : 'Registrar aluguel'}</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={() => { setShowModal(false); resetFilds(); }}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="modalName" className="form-label">Cliente</label>
                                        <QuerySelector data={clients} labelKey={'name'} valueKey={'id'} onChange={(e) => setUserId(e?.target?.value)} required={true} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="modalName" className="form-label">De:</label>
                                        <IMaskInput type={'date'} className="form-control" required value={startDate} onChange={(e)=>setStartDate(e?.target?.value)}/>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="modalName" className="form-label">Até:</label>
                                        <IMaskInput type={'date'} className="form-control" required value={endDate} onChange={(e)=>setEndDate(e?.target?.value)}/>
                                    </div>
                                </div>
                                <hr />
                                <div style={{ display: "flex", justifyContent: "space-between", width: '100%', alignItems: "center", marginBottom: '10px' }}>
                                    <h6 className="text-left" style={{ display: "flex", gap: '4px', alignItems: "center" }}>
                                        <i class="bi bi-box-seam" style={{ fontSize: '1rem' }}></i>
                                        Produtos
                                    </h6>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        style={{ height: "30px", display: "flex", gap: '4px', justifyContent: "center", alignItems: "center" }}
                                        onClick={() => AddProductHandle()}
                                    >
                                        <i className="bi bi-cart-plus"></i>
                                        Add produtos
                                    </button>
                                </div>
                                <div className="row" style={{ display: "flex", flexDirection: "column", gap: '8px' }}>
                                    {
                                        cart.map((item, key) => {
                                            return (
                                                <div className="row" style={{ display: "flex", alignItems: "center" }}>
                                                    <div className="col-8">
                                                        <QuerySelector
                                                            key={key}
                                                            data={products}
                                                            labelKey={'description'}
                                                            valueKey={'id'}
                                                            onChange={
                                                                (e) => {
                                                                    console.log(cart)
                                                                    cart[key].product_id = e?.target?.value
                                                                }
                                                            }
                                                            required={true} />

                                                    </div>
                                                    <div className="col-3 d-flex-row">
                                                        <IMaskInput
                                                            type={'number'}
                                                            className="form-control"
                                                            onMouseLeave={() => updateTotalPrice()}
                                                            onChange={
                                                                (e) => {
                                                                    updateTotalPrice()
                                                                    console.log(cart)
                                                                    cart[key].product_quantity = e?.target?.value
                                                                }
                                                            }
                                                            required />
                                                    </div>
                                                    <div className="col-1 d-flex-row">
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger"
                                                            style={{ height: "40px", display: "flex", gap: '4px', justifyContent: "center", alignItems: "center" }}
                                                            onClick={() => removeItem(key)}
                                                        >
                                                            <i class="bi bi-trash3-fill" style={{ color: '#fff' }}></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <h6>{priceFormat(totalDailyPrice)}</h6>
                            {!editMode && <button type="button" className="btn btn-primary" onClick={() => { console.log(mainBody) }}>Cadastrar aluguel</button>}
                            {editMode && <button type="button" className="btn btn-primary" onClick={() => { }}>Salvar alteração</button>}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}