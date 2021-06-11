import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch';


export const companyStartAddNew = ( company ) => {
    return async( dispatch, getState ) => {


        try {
            // const resp = await fetchConToken('auth/register', company, 'POST');
            // const body = await resp.json();

            // console.log(body)
 

        } catch (error) {
            console.log(error);
        }

        

    }
}



const companyAddNew = (company) => ({
    type: types.companyAddNew,
    payload: company
});

export const companySetActive = (company) => ({
    type: types.companySetActive,
    payload: company
});

export const clearActiveCompany = () => ({ type: types.clearActiveCompany });



export const companyStartUpdate = ( event ) => {
    return async(dispatch) => {

        try {
            // const resp = await fetchConToken(`events/${ event.id }`, event, 'PUT' );
            // const body = await resp.json();

            // if ( body.ok ) {
            //     dispatch( eventUpdated( event ) );
            // } else {
            //     Swal.fire('Error', body.msg, 'error');
            // }


        } catch (error) {
            console.log(error)
        }

    }
}

const companyUpdated = ( company ) => ({
    type: types.companyUpdated,
    payload: company
});


export const companyStartDelete = () => {
    return async ( dispatch, getState ) => {

        const { id } = getState().calendar.activeEvent;
        try {
            const resp = await fetchConToken(`events/${ id }`, {}, 'DELETE' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( companyDeleted() );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}


const companyDeleted = () => ({ type: types.companyDeleted });


// export const companyStartLoading = () => {
//     return async(dispatch) => {

//         try {
            
//             const resp = await fetchConToken( 'auth/accounts' );
//             const body = await resp.json();
            
//             dispatch( companyLoaded( body.Accounts ) );

//         } catch (error) {
//             console.log(error)
//         }

//     }
// }

export const companyLoaded = (companies) => ({
    type: types.companyLoaded,
    payload: companies
})

export const companyLogout =() => ({ type: types.companyLogout });