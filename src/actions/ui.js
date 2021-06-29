import { types } from '../types/types';


// Customer
export const uiOpenModal = () => ({ type: types.uiOpenModal });
export const uiCloseModal = () => ({ type: types.uiCloseModal });

export const setError = ( err ) => ({
    type: types.uiSetError,
    payload: err
});

export const removeError = () => ({ type: types.uiRemoveError });

// Company
export const uiOpenModalCompany = () => ({ type: types.uiOpenModalCompany });
export const uiCloseModalCompany = () => ({ type: types.uiCloseModalCompany });

export const setErrorCompany = ( err ) => ({
    type: types.uiSetErrorCompany,
    payload: err
});

export const removeErrorCompany = () => ({ type: types.uiRemoveErrorCompany });

// Rule
export const uiOpenModalRule = () => ({ type: types.uiOpenModalRule });
export const uiCloseModalRule = () => ({ type: types.uiCloseModalRule });

export const setErrorRule = ( err ) => ({
    type: types.uiSetErrorRule,
    payload: err
});

export const removeErrorRule = () => ({ type: types.uiRemoveErrorRule });