import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { customersStartLoading } from '../../actions/customers';
import { AddNewFab } from '../ui/AddNewFab';
import { Navbar } from '../ui/Navbar'
import { CompanyModal } from './CompanyModal';
import { CustomerModal } from './CustomerModal';
import { TableCustomers } from './TableCustomers'

export const DashboardScreen = () => {

    const dispatch = useDispatch();
    const { customers, activeCustomer } = useSelector( state => state.customer );
        
    useEffect(() => {
        
        dispatch( customersStartLoading() );

    }, [ dispatch ])

    
    return (
        <div >
            <Navbar />
            
            {/* Listar Clientes */}
            {customers && <TableCustomers customers={ customers }/>}

            <AddNewFab />


            {/* {
                (activeCustomer) && <DeleteEventFab />
            } */}
            

            <CustomerModal />

            <CompanyModal />


        </div>
    )
}
