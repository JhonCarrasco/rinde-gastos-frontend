import React from 'react';
import { useDispatch } from 'react-redux'


export const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleDelete = () => {
        
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={ handleDelete }
        >
            <i className="fas fa-trash"></i>
            <span> Borrar cliente </span>
        </button>
    )
}
