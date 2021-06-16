// import Swal from 'sweetalert2';

import { types } from '../types/types';




export const companyAddNew = (company) => ({
    type: types.companyAddNew,
    payload: company
});

export const companySetActive = (company) => ({
    type: types.companySetActive,
    payload: company
});

export const clearActiveCompany = () => ({ type: types.clearActiveCompany });



export const companyUpdated = ( company ) => ({
    type: types.companyUpdated,
    payload: company
});


export const companyDeleted = () => ({ type: types.companyDeleted });


export const companyLoaded = (companies) => ({
    type: types.companyLoaded,
    payload: companies
})

export const companyLogout =() => ({ type: types.companyLogout });

export const EnableCustomer = (enable) => ({
    type: types.companyEnableCustomers,
    payload: enable
})