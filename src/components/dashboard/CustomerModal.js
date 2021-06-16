import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Modal from 'react-modal';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
// import validator from 'validator';
// import Swal from 'sweetalert2';
import { removeError, setError, uiCloseModal, uiOpenModalCompany } from '../../actions/ui';
import { clearActiveCustomer, customerStartAddNew, customerStartUpdate } from '../../actions/customers';
import { CompanyCollapsible } from './CompanyCollapsible';
import { companyLogout, EnableCustomer } from '../../actions/company';


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

    Id: null,
    Rut: null,
    CustomerName: null,
    Email: null,
    Password: null,
    Password2: null,
    LogoUrl: null,
    Role: null,
    Companies: []
}



export const CustomerModal = () => {

    const { modalOpen } = useSelector(state => state.ui);
    const { activeCustomer } = useSelector(state => state.customer);
    const { msgError } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const [changePassword, setChangePassword] = useState(false);
    const [changeEnableCustomer, setChangeEnableCustomer] = useState(false);



    const [formValues, setFormValues] = useState(initCustomer);
    const { Rut, CustomerName, Email, Password, LogoUrl, Role, Password2 } = formValues;


    useEffect(() => {

        
        // New or Update
        if (activeCustomer) {
            setFormValues(activeCustomer);
            setChangePassword(false)
            const enableCustomer = activeCustomer.Companies.some(
                c => c.EnableIntegration === true
            );
            setChangeEnableCustomer(enableCustomer);
        } else {
            setChangePassword(true)
            setFormValues(initCustomer);
        }
        
        
    }, [activeCustomer, setFormValues, setChangeEnableCustomer])



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
        dispatch(companyLogout());
        setFormValues(initCustomer);
    }

    const isFormValid = () => {

        if (Rut.trim().length === 0) {
            dispatch(setError('Rut es requerido'))
            return false;
        } else if (CustomerName.trim().length === 0) {
            dispatch(setError('Nombre es requerido'))
            return false;
        }
        // else if (!validator.isEmail(Email)) {
        //     dispatch(setError('Email no es valido'))
        //     return false;
        // } 
        else if (changePassword && (Password !== Password2 || Password.length < 6)) {
            dispatch(setError('Las contraseñas deben tener al menos 6 caracteres y deben ser iguales'))
            return false
        } else if (Role.trim().length === 0) {
            dispatch(setError('Rol es requerido'))
            return false;
        }

        dispatch(removeError());
        return true;
    }

    const handleClickNewCompany = () => {
        dispatch(uiOpenModalCompany());
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        if (!isFormValid(formValues)) {
            return console.log('invalido')
        }
        
        if (activeCustomer) {

            dispatch(customerStartUpdate(formValues))
        } else {

            dispatch(customerStartAddNew(formValues));
        }



        closeModal();

    }

    const handleEnableCustomer = () => {
        setChangeEnableCustomer(!changeEnableCustomer)
        dispatch( EnableCustomer(!changeEnableCustomer) );
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
            <div className="d-flex">
                <button
                    type="button"
                    className="btn btn-danger btn-sm ml-auto"
                    onClick={() => closeModal()}
                >
                    <i className="far fa-window-close"></i>
                </button>
            </div>
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
                            {msgError}
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
                        value={Rut || ''}
                        onChange={handleInputChange}
                    />

                </div>

                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        name="CustomerName"
                        autoComplete="off"
                        value={CustomerName || ''}
                        onChange={handleInputChange}
                    />
                    
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        name="Email"
                        autoComplete="off"
                        value={Email || ''}
                        onChange={handleInputChange}
                    />

                </div>


                {activeCustomer && (
                    <div className="input-group mb-3">
                        <label className="input-group-text col-10">Cambiar Password</label>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <input type="checkbox" checked={changePassword} onChange={() => setChangePassword(!changePassword)} />
                            </div>
                        </div>
                    </div>)
                }
                {
                    (changePassword) &&
                    <div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="Password"
                                autoComplete="off"
                                value={Password || ''}
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
                                value={Password2 || ''}
                                onChange={handleInputChange}
                            />
                            {/* <small id="emailHelp" className="form-text text-muted">Una descripción corta</small> */}
                        </div>
                    </div>
                }
                <hr />

                <div className="form-group">
                    <label>Logo</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Url"
                        name="LogoUrl"
                        autoComplete="off"
                        value={LogoUrl || ''}
                        onChange={handleInputChange}
                    />
                    
                </div>

                <div className="form-group row">

                    <DropdownButton
                        // key={variant}
                        className="col-3"
                        id="Roles"
                        variant="secondary"
                        title="Roles"
                    >
                        <Dropdown.Item eventKey="1" onClick={() => handleRole('Admin')}>Admin</Dropdown.Item>
                        <Dropdown.Item eventKey="2" onClick={() => handleRole('Customer')}>Customer</Dropdown.Item>
                    </DropdownButton>
                    <input
                        type="text"
                        className="form-control col-8"
                        placeholder="Role"
                        name="Role"
                        autoComplete="off"
                        value={Role || ''}
                        onChange={handleInputChange}
                        readOnly
                    />
                    
                </div>
                <hr />



                <div className="form-group">

                    <CompanyCollapsible />
                    <div>
                        <button
                            type="button"
                            className={activeCustomer ? ( changePassword ? "btn btn-success fab-edit-active-password" : "btn btn-success fab-edit") : ("btn btn-success fab-add")}
                            onClick={handleClickNewCompany}
                        >
                            <i className="fas fa-plus"></i>
                        </button>

                    </div>
                </div>
                <hr />


                <div className="input-group mb-4">
                    <label className="input-group-text col-10">{changeEnableCustomer ? 'Habilitado' : 'Deshabilitado'}</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" checked={changeEnableCustomer} onChange={handleEnableCustomer} />
                        </div>
                    </div>
                </div>
                <hr />

                <div className="row justify-content-around">
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-block mt-3 col-5"
                        onClick={() => closeModal()}
                    >
                        <i className="far fa-window-close"></i>
                        <span>{' Cerrar'}</span>
                    </button>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block mt-3 col-5"
                    >
                        <i className="far fa-save"></i>
                        <span>{(activeCustomer) ? 'Actualizar' : 'Registrar'}</span>
                    </button>
                </div>

            </form>

        </Modal>
    )
}
