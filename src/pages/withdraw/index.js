import React, { useEffect, useState } from "react";
import { api } from "../../config/api";
import { toast } from "react-toastify";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import OnTime from "./tabs/onTime";
import Expiring from "./tabs/expiring";
import Arrears from "./tabs/arrears";

export default function Withdraw() {

    const [withdrawnTab, setWithdrawnTab] = useState('ontime')

    const [data, setData] = useState([]);
    const [registrated, setRegistrated] = useState(false);
    const [description, setDescription] = useState();
    const [quantityOwned, setQuantityOwned] = useState();
    const [dailyPrice, setDailyPrice] = useState();
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false)
    const [idSelected, setIdSelected] = useState(0)
    const [search, setSearch] = useState('')

    // useEffect(() => {
    //     fetchData();
    // }, [registrated, showModal]);

    // const fetchData = async () => {
    //     try {
    //         const response = await api.get('/stock');

    //         if (response?.data?.pages > 1) {
    //             let ndata = []

    //             response.data?.data.forEach(element => {

    //                 console.log(element)
    //                 ndata.push(element)
    //             });

    //             for (let i = 2; i <= response?.data?.pages; i++) {
    //                 let res = await api.get(`/stock?page=${i}`)

    //                 res.data?.data.forEach(element => {
    //                     console.log(element)
    //                     ndata.push(element)
    //                 })
    //             }

    //             return setData(ndata)

    //         }


    //         return setData(response?.data?.data);
    //     } catch (error) {
    //         toast('Algo deu errado', { type: 'error' });
    //     }
    // }


    // const resetFilds = () => {
    //     setIdSelected('');

    // }


    // const handleSubmit = async () => {
    //     if (!description || !quantityOwned || !dailyPrice) {
    //         return toast('Por favor, preencha todas as informações', { type: 'warning' });
    //     }

    //     try {
    //         await api.post('/stock', {
    //             description,
    //             quantity_owned: quantityOwned,
    //             daily_price: dailyPrice
    //         });

    //         setShowModal(false);
    //         setRegistrated(!registrated);
    //         resetFilds()
    //         toast('Produto criado com sucesso', { type: 'success' });
    //     } catch (error) {
    //         console.log(error);
    //         toast('Algo deu errado', { type: 'error' });
    //     }
    // }

    // const handleEdit = async (e) => {
    //     setEditMode(true)
    //     setShowModal(true)
    //     setIdSelected(e.data.id)
    // }

    // const handleEditSubmit = async () => {

    //     if (!description || !quantityOwned || !dailyPrice) {
    //         return toast('Por favor, preencha todas as informações', { type: 'warning' });
    //     }

    //     try {
    //         await api.post(`/stock/${idSelected}/edit`, {
    //             description,
    //             quantity_owned: quantityOwned,
    //             daily_price: dailyPrice
    //         });

    //         setShowModal(false);
    //         setEditMode(false)
    //         setRegistrated(!registrated);
    //         toast('Alteração concluída!', { type: 'success' });

    //         resetFilds()
    //     } catch (error) {
    //         console.log(error);
    //         toast('Algo deu errado na alteração', { type: 'error' });
    //     }

    // }

    // const getSearch = () => {
    //     let ndata = data.filter(item=>(item.description.toLowerCase().includes(search.toLowerCase())))
    //     return ndata
    // }


    return (
        <div style={{ display: "flex", flexDirection: "column", width: '100%', alignItems: 'center' }}>
            <div style={{ width: "100%", display: "flex", width: '100%', alignItems: "center", marginTop: "20px" }}>
                <div className="container-lg" style={{display: 'flex', justifyContent: "space-between", width: '100%', alignItems: "center",'@media (max-width: 768px)': {
                    width: '100vw'
                }}}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: '100%', alignItems: "center" }}>
                        <p className="fs-3 text-left">Retirados</p>
                        <button
                            type="button"
                            className="btn btn-primary"
                            style={{ height: "40px" }}
                            onClick={() => {setShowModal(true); setEditMode(false)}}
                        >
                            <i className="bi bi-folder-plus"></i> NOVO PRODUTO
                        </button>
                    </div>
                </div>
            </div>
            <div style={{display: "flex", width: '100%', justifyContent: 'flex-start'}}>
                <button style={{width: '100px', height: '40px', backgroundColor: withdrawnTab == 'ontime' ? '#0D6EFD' : 'transparent',     color: withdrawnTab == 'ontime' ? '#fff' : '#000' ,     borderRadius: '4px', borderBottomRightRadius: '0px', borderBottomLeftRadius: '0px', border: '1px solid #D2D2D2', borderBottom: 'none'}} onClick={()=>setWithdrawnTab('ontime')}>No prazo</button>
                <button style={{width: '100px', height: '40px', backgroundColor: withdrawnTab == 'expiring' ? '#0D6EFD' : 'transparent',   color: withdrawnTab == 'expiring' ? '#fff' : '#000' ,   borderRadius: '4px', borderBottomRightRadius: '0px', borderBottomLeftRadius: '0px', border: '1px solid #D2D2D2', borderBottom: 'none'}} onClick={()=>setWithdrawnTab('expiring')}>Vencendo</button>
                <button style={{width: '100px', height: '40px', backgroundColor: withdrawnTab == 'arrears' ? '#0D6EFD' : 'transparent',    color: withdrawnTab == 'arrears' ? '#fff' : '#000' ,    borderRadius: '4px', borderBottomRightRadius: '0px', borderBottomLeftRadius: '0px', border: '1px solid #D2D2D2', borderBottom: 'none'}} onClick={()=>setWithdrawnTab('arrears')}>Atrasados</button>
            </div>
            { withdrawnTab == 'ontime'      && <OnTime/>    }
            { withdrawnTab == 'expiring'    && <Expiring/>  }
            { withdrawnTab == 'arrears'     && <Arrears/>   }

            
        </div>
    );
}