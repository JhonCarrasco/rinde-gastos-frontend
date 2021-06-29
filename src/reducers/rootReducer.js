import { combineReducers } from 'redux';

import { uiReducer } from './uiReducer';
import { authReducer } from './authReducer';
import { customerReducer } from './customerReducer';
import { companyReducer } from './companyReducer';
import { ruleReducer } from './ruleReducer';


export const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    customer: customerReducer,
    company: companyReducer,
    rule: ruleReducer
})

