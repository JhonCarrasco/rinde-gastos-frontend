import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch';


export const customerStartAddNew = ( customer ) => {
    return async( dispatch, getState ) => {

        const { companies } = getState().company;
        let { Rut, CustomerName, Email, Password, LogoUrl, Role, Companies } = customer;
        // console.log({ Rut, CustomerName, Email, Password, LogoUrl, Role, Companies })

        try {
            // const resp = await fetchConToken('auth/register', customer, 'POST');
            // const body = await resp.json();

            // console.log(body)

            // if ( body.ok ) {
            //     event.id = body.evento.id;
            //     event.user = {
            //         _id: uid,
            //         name: name
            //     }
            //     console.log( event );
            //     dispatch( customerAddNew( event ) );
            // }

            
            Companies = [...companies];                      
            dispatch( customerAddNew({ Rut, CustomerName, Email, Password, LogoUrl, Role, Companies }));


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



export const customerStartUpdate = ( customer ) => {
    return async(dispatch, getState) => {

        const { companies } = getState().company;
        let { Id, Rut, CustomerName, Email, Password, LogoUrl, Role, Companies } = customer;
        // console.log({ Id, Rut, CustomerName, Email, Password, LogoUrl, Role })
        try {
            // const resp = await fetchConToken(`events/${ event.id }`, event, 'PUT' );
            // const body = await resp.json();

            // if ( body.ok ) {
            //     dispatch( eventUpdated( event ) );
            // } else {
            //     Swal.fire('Error', body.msg, 'error');
            // }
            
            Companies = [...companies];            
            dispatch( customerUpdated({ Id, Rut, CustomerName, Email, Password, LogoUrl, Role, Companies }));
            


        } catch (error) {
            console.log(error)
        }

    }
}

const customerUpdated = ( customer ) => ({
    type: types.customerUpdated,
    payload: customer
});


export const eventStartDelete = () => {
    return async ( dispatch, getState ) => {

        // const { id } = getState().calendar.activeEvent;
        try {
            // const resp = await fetchConToken(`events/${ id }`, {}, 'DELETE' );
            // const body = await resp.json();

            // if ( body.ok ) {
            //     dispatch( eventDeleted() );
            // } else {
            //     Swal.fire('Error', body.msg, 'error');
            // }


        } catch (error) {
            console.log(error)
        }

    }
}


const eventDeleted = () => ({ type: types.eventDeleted });


export const customersStartLoading = () => {
    return async(dispatch) => {

        try {
            
            const resp = await fetchConToken( 'auth/accounts' );
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

export const eventLogout =() => ({ type: types.eventLogout });