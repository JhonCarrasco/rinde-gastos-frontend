import { types } from '../types/types';


const initialState = {
    companies: [],
    activeCompany: null
};


export const companyReducer = (state = initialState, action) => {

    switch (action.type) {

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


        case types.companyUpdated:
            return {
                ...state,
                companies: state.companies.map(
                    c => (c.Code === action.payload.Code) ? action.payload : c
                )
            }

        case types.companyDeleted:
            return {
                ...state,
                companies: state.companies.filter(
                    c => (c.Code !== state.activeCompany.Code)
                ),
                activeCompany: null
            }

        case types.companyLoaded:
            return {
                ...state,
                companies: [...action.payload]
            }

        case types.companyLogout:
            return {
                ...initialState
            }

        case types.companyEnableCustomers:
            return {
                ...state,
                companies: state.companies.map(
                    c => ({
                        ...c,
                        EnableIntegration: action.payload
                    })
                )
            }

        default:
            return state;
    }


}
