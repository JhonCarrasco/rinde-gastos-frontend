import { types } from "../types/types";

const initialState = {
    modalOpen: false,
    msgError: null,
    companyModalOpen: false,
    companyMsgError: null,
    ruleModalOpen: false,
    ruleMsgError: null
}



export const uiReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            }

        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false
            }

        case types.uiSetError:
            return {
                ...state,
                msgError: action.payload
            }

        case types.uiRemoveError:
            return {
                ...state,
                msgError: null
            }

        // Company
        case types.uiOpenModalCompany:
            return {
                ...state,
                companyModalOpen: true
            }

        case types.uiCloseModalCompany:
            return {
                ...state,
                companyModalOpen: false
            }

        case types.uiSetErrorCompany:
            return {
                ...state,
                companyMsgError: action.payload
            }

        case types.uiRemoveErrorCompany:
            return {
                ...state,
                companyMsgError: null
            }

        // Rule
        case types.uiOpenModalRule:
            return {
                ...state,
                ruleModalOpen: true
            }

        case types.uiCloseModalRule:
            return {
                ...state,
                ruleModalOpen: false
            }

        case types.uiSetErrorRule:
            return {
                ...state,
                ruleMsgError: action.payload
            }

        case types.uiRemoveErrorRule:
            return {
                ...state,
                ruleMsgError: null
            }

        default:
            return state;
    }


}