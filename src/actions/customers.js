import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchWithToken } from '../helpers/fetch';


export const customerStartAddNew = ( customerForm ) => {
    return async( dispatch, getState ) => {

        const { companies } = getState().company;
        let { Id, Rut, CustomerName, Email, Password, LogoUrl, Role, Companies } = customerForm;
        Companies = [...companies];

        try {
            
            let valueForm = { Id, Rut, CustomerName, Email, Password, LogoUrl, Role, Companies };
            
            const resp = await fetchWithToken('auth/register', valueForm, 'POST');
            const body = await resp.json();

            const { Message, title } = body

            if (Message){
                dispatch( customerAddNew(valueForm))
                Swal.fire('success', Message, 'success');
            } else {
                Swal.fire('Error', title, 'error');
            }
            


        } catch (error) {
            console.log(error);
        }

        

    }
}

const customerAddNew = (customer) => ({
    type: types.customerAddNew,
    payload: customer
});




export const customerSetActive = (customer) => ({
    type: types.customerSetActive,
    payload: customer
});

export const clearActiveCustomer = () => ({ type: types.clearActiveCustomer });




export const customerStartUpdate = ( customerForm ) => {
    return async(dispatch, getState) => {

        const { companies } = getState().company;
        let { Id, Rut, CustomerName, Email, Password, Password2, LogoUrl, Role, Companies } = customerForm;
        Companies = [...companies];

        try {
            
            let valueForm = {};

            if(Password2) {
                valueForm = { Id, Rut, CustomerName, Email, Password, LogoUrl, Role, Companies };
            }
            else {
                valueForm =  { Id, Rut, CustomerName, Email, LogoUrl, Role, Companies };
            }
            

            const resp = await fetchWithToken('auth/update', valueForm, 'POST');
            const body = await resp.json();
            const { Message, title } = body

            if (Message){
                dispatch( customerUpdated(valueForm))
                Swal.fire('success', Message, 'success');
            } else {
                Swal.fire('Error', title, 'error');
            }
            

        } catch (error) {
            console.log(error)
        }

    }
}

const customerUpdated = ( customer ) => ({
    type: types.customerUpdated,
    payload: customer
});


export const customersStartLoading = () => {
    return async(dispatch) => {

        try {
            
            const resp = await fetchWithToken( 'auth/accounts' );
            const body = await resp.json();
            
            dispatch( customersLoaded( body.Accounts ) );

        } catch (error) {
            console.log(error)
        }

    }
}

const customersLoaded = (customers) => ({
    type: types.customersLoaded,
    payload: customers
})


