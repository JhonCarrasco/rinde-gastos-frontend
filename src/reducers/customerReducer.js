import { types } from '../types/types';

const initialState = {
    customers: [],
    activeCustomer: null
};


export const customerReducer = ( state = initialState, action ) => {
    
    switch ( action.type ) {
        
        case types.customerSetActive:
            return {
                ...state,
                activeCustomer: action.payload
            }
        
        case types.customerAddNew:
            return {
                ...state,
                customers: [
                    ...state.customers,
                    action.payload
                ]
            }
    
        case types.clearActiveCustomer:
            return {
                ...state,
                activeCustomer: null
            }


        case types.customerUpdated:
            return {
                ...state,
                customers: state.customers.map(
                    c => ( c.Id === action.payload.Id ) ? action.payload : c
                )
            }
        
        
        case types.customersLoaded:
            return {
                ...state,
                customers: [ ...action.payload ]
            }

        
        default:
            return state;
    }


}
