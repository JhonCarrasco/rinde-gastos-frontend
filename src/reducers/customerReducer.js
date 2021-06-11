import { types } from '../types/types';
// {
//     id: 'askdjhaksdjas',
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(),
//     end: moment().add( 2, 'hours' ).toDate(),
//     notes: 'Comprar el pastel',
//     user: {
//         _id: '123',
//         name: 'Fernando'
//     }
// }

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
                events: [
                    ...state.customers,
                    action.payload
                ]
            }
    
        case types.clearActiveCustomer:
            return {
                ...state,
                activeCustomer: null
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

        case types.customersLoaded:
            return {
                ...state,
                customers: [ ...action.payload ]
            }

        // case types.eventLogout:
        //     return {
        //         ...initialState
        //     }

        default:
            return state;
    }


}
