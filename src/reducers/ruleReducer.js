import { types } from '../types/types';


const initialState = {
    rules: [],
    activeRule: null
};


export const ruleReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.ruleSetActive:
            return {
                ...state,
                activeRule: action.payload
            }

        case types.ruleAddNew:
            return {
                ...state,
                rules: [
                    ...state.rules,
                    action.payload
                ]
            }

        case types.clearActiveRule:
            return {
                ...state,
                activeRule: null
            }


        case types.ruleUpdated:
            return {
                ...state,
                rules: state.rules.map(
                    r => (r.RuleFieldValue === action.payload.RuleFieldValue) ? action.payload : r
                )
            }

        case types.ruleDeleted:
            return {
                ...state,
                rules: state.rules.filter(
                    r => ( r.RuleFieldValue !== state.activeRule.RuleFieldValue )
                ),
                activeRule: null
            }

        case types.ruleLoaded:
            return {
                ...state,
                rules: [...action.payload]
            }

        case types.ruleLogout:
            return {
                ...initialState
            }


        default:
            return state;
    }


}
