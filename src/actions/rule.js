// import Swal from 'sweetalert2';

import { types } from '../types/types';




export const ruleAddNew = (rule) => ({
    type: types.ruleAddNew,
    payload: rule
});

export const ruleSetActive = (rule) => ({
    type: types.ruleSetActive,
    payload: rule
});

export const clearActiveRule = () => ({ type: types.clearActiveRule });



export const ruleUpdated = ( rule ) => ({
    type: types.ruleUpdated,
    payload: rule
});


export const ruleDeleted = () => ({ type: types.ruleDeleted });


export const ruleLoaded = (rules) => ({
    type: types.ruleLoaded,
    payload: rules
})

export const ruleLogout =() => ({ type: types.ruleLogout });
