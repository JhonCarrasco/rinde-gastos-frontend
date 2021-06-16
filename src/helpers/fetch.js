const baseUrl = process.env.REACT_APP_API_URL;

const fetchNoToken = ( endpoint, data, method = 'GET' ) => {
    
    const url = `${ baseUrl }/${ endpoint }`;
    console.log(url)
    if ( method === 'GET' ) {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}

const fetchWithToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;
    const token = localStorage.getItem('token') || '';

    if ( method === 'GET' ) {
        return fetch( url, {
            method,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify( data )
        });
    }
}



export {
    fetchNoToken,
    fetchWithToken
}