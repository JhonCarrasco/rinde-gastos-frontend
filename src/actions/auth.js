import { fetchNoToken, fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';




export const startLogin = ( email, password ) => {
    return async( dispatch ) => {

        const resp = await fetchNoToken( 'auth/login', { email, password }, 'POST' );
        const body = await resp.json();
        
        if( body.Token ) {
            localStorage.setItem('token', body.Token );

            const response = await fetchWithToken( 'auth/account' );
            const data = await response.json();
            
            dispatch( login({
                uid: data.Account.Id,
                name: data.Account.CustomerName
            }) )
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
        

    }
}

export const startRegister = ( email, password, name ) => {
    return async( dispatch ) => {

        const resp = await fetchNoToken( 'auth/new', { email, password, name }, 'POST' );
        const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            Swal.fire('Error', body.msg, 'error');
        }


    }
}

export const startChecking = () => {
    return async(dispatch) => {

        const resp = await fetchWithToken( 'auth/account' );
        const data = await resp.json();
        

        if( data.Account ) {
            
            dispatch( login({
                uid: data.Account.Id,
                name: data.Account.CustomerName
            }) )
        } else {
            dispatch( checkingFinish() );
        }
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });



const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});


export const startLogout = () => {
    return ( dispatch ) => {

        localStorage.clear();
        dispatch( logout() );
    }
}

const logout = () => ({ type: types.authLogout })