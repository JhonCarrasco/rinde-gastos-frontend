import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { customersStartLoading } from '../../actions/customers';
import { AddNewFab } from '../ui/AddNewFab';
import { Navbar } from '../ui/Navbar'
import { CompanyModal } from './CompanyModal';
import { CustomerModal } from './CustomerModal';
import { RulesModal } from './RulesModal';
import { TableCustomers } from './TableCustomers'

export const DashboardScreen = () => {

    const dispatch = useDispatch();
    const { customers } = useSelector( state => state.customer );
        
    useEffect(() => {
        
        dispatch( customersStartLoading() );

    }, [ dispatch ])

    
    return (
        <div>
            <Navbar />
            
            {/* Customer List */}
            {customers && <TableCustomers customers={ customers }/>}

            <AddNewFab />

              

            <CustomerModal />
            
            <CompanyModal />

            <RulesModal />


        </div>
    )
}
