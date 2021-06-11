import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { customersStartLoading } from '../../actions/customers';
import { AddNewFab } from '../ui/AddNewFab';
import { Navbar } from '../ui/Navbar'
import { CustomerModal } from './CustomerModal';
import { TableCustomers } from './TableCustomers'

export const DashboardScreen = () => {

    const dispatch = useDispatch();
    const { customers, activeCustomer } = useSelector( state => state.customer );
    const { uid } = useSelector( state => state.auth );
    
    useEffect(() => {
        
        dispatch( customersStartLoading() );

    }, [ dispatch ])


    // const onDoubleClick = (e) => {
    //     // console.log(e);
    //     dispatch( uiOpenModal() );
    // }
    
    return (
        <div >
            <Navbar />
            
            {/* Listar Clientes */}
            {customers && <TableCustomers customers={ customers }/>}

            <AddNewFab />


            {/* {
                (activeEvent) && <DeleteEventFab />
            } */}
            

            <CustomerModal />



        </div>
    )
}
