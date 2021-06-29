
import { types } from '../types/types';


export const companyStartAddNew = ( companyForm ) => {
    return async( dispatch, getState ) => {

        const { rules } = getState().rule;
        let { CustomRules, ...args } = companyForm;
        CustomRules = [...rules];

        try {
            
            let valueForm = { CustomRules, ...args };
            
            dispatch( companyAddNew(valueForm));
            
        } catch (error) {
            console.log(error);
        }

        

    }
}

export const companyAddNew = (company) => ({
    type: types.companyAddNew,
    payload: company
});

export const companySetActive = (company) => ({
    type: types.companySetActive,
    payload: company
});


export const clearActiveCompany = () => ({ type: types.clearActiveCompany });

export const companyStartUpdate = ( companyForm ) => {
    return async( dispatch, getState ) => {

        const { rules } = getState().rule;
        let { CustomRules, ...args } = companyForm;
        CustomRules = [...rules];

        try {
            
            let valueForm = { CustomRules, ...args };
            
            dispatch( companyUpdated(valueForm));
            
            
        } catch (error) {
            console.log(error);
        }

        

    }
}

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