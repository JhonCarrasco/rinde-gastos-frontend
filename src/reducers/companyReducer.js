import { types } from '../types/types';


const initialState = {
    companies: [],
    activeCompany: null
};


export const companyReducer = ( state = initialState, action ) => {
    
    switch ( action.type ) {
        
        case types.companySetActive:
            return {
                ...state,
                activeCompany: action.payload
            }
        
        case types.companyAddNew:
            return {
                ...state,
                companies: [
                    ...state.companies,
                    action.payload
                ]
            }
    
        case types.clearActiveCompany:
            return {
                ...state,
                activeCompany: null
            }


        // case types.eventUpdated:
        //     return {
        //         ...state,
        //         events: state.events.map(
        //             e => ( e.id === action.payload.id ) ? action.payload : e
        //         )
        //     }
        
        // case types.eventDeleted:
        //     return {
        //         ...state,
        //         events: state.events.filter(
        //             e => ( e.id !== state.activeEvent.id )
        //         ),
        //         activeEvent: null
        //     }

        case types.companyLoaded:
            return {
                ...state,
                companies: [ ...action.payload ]
            }

        // case types.eventLogout:
        //     return {
        //         ...initialState
        //     }

        default:
            return state;
    }


}