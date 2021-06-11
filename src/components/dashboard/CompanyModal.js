import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Modal from 'react-modal';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import validator from 'validator';
import Swal from 'sweetalert2';
import { removeError, setError, uiCloseModal } from '../../actions/ui';
import { clearActiveCustomer, customerStartAddNew, customerStartUpdate } from '../../actions/customers';
import { CompanyCollapsible } from './CompanyCollapsible';


Modal.setAppElement('body');



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const initCustomer = {

    Rut: '',
    CustomerName: '',
    Email: '',
    Password: '',
    Password2: '',
    LogoUrl: '',
    Role: '',
    Companies: []
}



export const CustomerModal = () => {

    const { modalOpen } = useSelector(state => state.ui);
    const { activeCustomer } = useSelector(state => state.customer);
    const { msgError } = useSelector(state => state.ui);
    const dispatch = useDispatch();



    const [formValues, setFormValues] = useState(initCustomer);
    const { Rut, CustomerName, Email, Password, LogoUrl, Role, Password2, Companies } = formValues;


    useEffect(() => {
        // New or Update
        if (activeCustomer) {
            setFormValues(activeCustomer);
        } else {
            setFormValues(initCustomer);
        }
    }, [activeCustomer, setFormValues])



    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleRole = (RoleSelected) => {
        setFormValues({
            ...formValues,
            Role: RoleSelected
        })
    }


    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch(uiCloseModal());
        dispatch(clearActiveCustomer());
        setFormValues(initCustomer);
    }

    const isFormValid = () => {

        if (Rut.trim().length === 0) {
            dispatch(setError('Rut es requerido'))
            return false;
        } else if (CustomerName.trim().length === 0) {
            dispatch(setError('Nombre es requerido'))
            return false;
        } else if (!validator.isEmail(Email)) {
            dispatch(setError('Email no es valido'))
            return false;
        } else if (!!!activeCustomer && (Password !== Password2 || Password.length < 6)) {
            dispatch(setError('Las contraseñas deben tener al menos 6 caracteres y deben ser iguales'))
            return false
        } else if (Role.trim().length === 0) {
            dispatch(setError('Rol es requerido'))
            return false;
        }

        dispatch(removeError());
        return true;
    }


    const handleSubmitForm = (e) => {
        e.preventDefault();

        if (!isFormValid(formValues)) {
            return console.log('invalido')
        }
        else {
            console.log('valido')
        }


        // if ( activeCustomer ) {
        //     dispatch( customerStartUpdate( formValues ) )
        // } else {
        //     dispatch( customerStartAddNew( formValues ) );
        // }



        closeModal();

    }



    return (
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1> {(activeCustomer) ? 'Editar Cliente' : 'Nuevo Cliente'} </h1>
            <hr />
            <form
                className="container"
                onSubmit={handleSubmitForm}
            >
                {
                    msgError &&
                    (
                        <div className="alert-error">
                            { msgError}
                        </div>
                    )
                }

                <div className="form-group">
                    <label>Rut</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="12345678-9"
                        name="Rut"
                        autoComplete="off"
                        value={Rut}
                        onChange={handleInputChange}
                    />

                    {/* <small id="emailHelp" className="form-text text-muted">Una descripción corta</small> */}
                </div>
                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        name="CustomerName"
                        autoComplete="off"
                        value={CustomerName}
                        onChange={handleInputChange}
                    />
                    {/* <small id="emailHelp" className="form-text text-muted">Una descripción corta</small> */}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        name="Email"
                        autoComplete="off"
                        value={Email}
                        onChange={handleInputChange}
                    />

                </div>


                {
                    !activeCustomer &&
                    <div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="Password"
                                autoComplete="off"
                                value={Password}
                                onChange={handleInputChange}
                            />
                            {/* <small id="emailHelp" className="form-text text-muted">Una descripción corta</small> */}
                        </div>
                        <div className="form-group">
                            <label>Confirmar Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirmar password"
                                name="Password2"
                                autoComplete="off"
                                value={Password2}
                                onChange={handleInputChange}
                            />
                            {/* <small id="emailHelp" className="form-text text-muted">Una descripción corta</small> */}
                        </div>
                    </div>
                }
                <div className="form-group">
                    <label>Logo</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Url"
                        name="LogoUrl"
                        autoComplete="off"
                        value={LogoUrl}
                        onChange={handleInputChange}
                    />
                    {/* <small id="emailHelp" className="form-text text-muted">Una descripción corta</small> */}
                </div>
                <div className="form-group">

                    <DropdownButton
                        // key={variant}
                        id="Roles"
                        variant="secondary"
                        title="Roles"
                    >
                        <Dropdown.Item eventKey="1" onClick={() => handleRole('Admin')}>Admin</Dropdown.Item>
                        <Dropdown.Item eventKey="2" onClick={() => handleRole('Customer')}>Customer</Dropdown.Item>
                    </DropdownButton>
                    <input
                        type="text"
                        className="form-control mt-1"
                        placeholder="Role"
                        name="Role"
                        autoComplete="off"
                        value={Role}
                        onChange={handleInputChange}
                        readOnly
                    />
                    {/* <small id="emailHelp" className="form-text text-muted">Una descripción corta</small> */}
                </div>


                

                <div className="form-group">
                        {
                            Companies.length !== 0 && (<CompanyCollapsible />)
                        }
                    <div>
                        <button
                            type="button"
                            className="btn btn-success fab2"
                            onClick={() => console.log('add company')}
                        >
                            <i className="fas fa-plus"></i>
                        </button>
                        
                    </div>
                </div>

                        

                        <button
                            type="submit"
                            className="btn btn-outline-primary btn-block mt-3"
                        >
                            <i className="far fa-save"></i>
                            <span>{(activeCustomer) ? 'Actualizar' : 'Registrar'}</span>
                        </button>

                        {/* <Button variant="primary" type="submit" >
                    <i className="far fa-save"></i>
                    <span>{(activeCustomer) ? 'Actualizar' : 'Registrar'}</span>
                </Button> */}

            </form>

        </Modal>
    )
}