import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Modal from 'react-modal';
import validator from 'validator';
import Swal from 'sweetalert2';
import { removeError, setError, uiCloseModal, uiOpenModalCompany } from '../../actions/ui';
import { clearActiveCustomer, customerStartAddNew, customerStartUpdate } from '../../actions/customers';
import { CompanyCollapsible } from './CompanyCollapsible';
import { companyLogout, EnableCustomer } from '../../actions/company';
import { ruleLogout } from '../../actions/rule';


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
    Rut: null || '',
    CustomerName: null || '',
    Email: null || '',
    Password: null || '',
    Password2: null || '',
    LogoUrl: null || '',
    Role: null || 'Customer',
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
    const { Rut, CustomerName, Email, Password, LogoUrl, Password2 } = formValues;


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

    
    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch(uiCloseModal());
        dispatch(clearActiveCustomer());
        dispatch(companyLogout());
        dispatch(ruleLogout());
        dispatch(removeError());
        setFormValues(initCustomer);
    }

    const isFormValid = () => {
        const errors = {};

        if (Rut.trim().length === 0) {
            errors.Rut = 'Rut is required';
        }
        if (CustomerName.trim().length === 0) {
            errors.CustomerName = 'CustomerName is required';
        }
        if (!validator.isEmail(Email)) {
            errors.Email = 'Email is not valid';
        }
        if (changePassword && (Password !== Password2 || Password.length < 6)) {
            errors.Password = 'Passwords must be at least 6 characters long and must be the same';
        }

        dispatch( setError( errors ));
        
        if (Object.entries(errors).length !== 0) {
            const list = document.createElement('ul');            
            const messages = Object.entries(errors);
            messages.forEach(([key, value]) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = value;
                list.appendChild(listItem);
            });
            Swal.fire('Required or invalid fields', list, 'error');
            return false;
        }
        else {
            return true;
        }

    }

    const handleClickNewCompany = () => {
        dispatch(uiOpenModalCompany());
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();


        if (!isFormValid(formValues)) {            
            return console.log('CustomerModal invalid...')
        }

        if (activeCustomer) {
            dispatch(customerStartUpdate(formValues))
            dispatch(removeError());
        } else {
            dispatch(customerStartAddNew(formValues));
            dispatch(removeError());
        }



        closeModal();

    }

    const handleEnableCustomer = () => {
        setChangeEnableCustomer(!changeEnableCustomer)
        dispatch(EnableCustomer(!changeEnableCustomer));
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
            <h1> {(activeCustomer) ? 'Edit Customer' : 'Add Customer'} </h1>
            <hr />
            <form
                className="container"
                onSubmit={handleSubmitForm}
            >
                
                <div className="form-group">
                    <label>Rut</label>
                    <input
                        type="text"
                        className={ (msgError && msgError.Rut)? "form-control border border-danger": "form-control"}
                        placeholder="12345678-9"
                        name="Rut"
                        autoComplete="off"
                        value={Rut || ''}
                        onChange={handleInputChange}
                    />

                </div>

                <div className="form-group">
                    <label>Customer Name</label>
                    <input
                        type="text"
                        className={ (msgError && msgError.CustomerName)? "form-control border border-danger": "form-control"}
                        placeholder="Customer Name"
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
                        className={ (msgError && msgError.Email)? "form-control border border-danger": "form-control"}
                        placeholder="Email"
                        name="Email"
                        autoComplete="off"
                        value={Email || ''}
                        onChange={handleInputChange}
                    />

                </div>


                {activeCustomer && (
                    <div className="input-group mb-3">
                        <label className="input-group-text col-10">Change Password</label>
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
                                className={ (msgError && msgError.Password)? "form-control border border-danger": "form-control"}
                                placeholder="Password"
                                name="Password"
                                autoComplete="off"
                                value={Password || ''}
                                onChange={handleInputChange}
                            />
                            {/* <small id="emailHelp" className="form-text text-muted">Una descripción corta</small> */}
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className={ (msgError && msgError.Password)? "form-control border border-danger": "form-control"}
                                placeholder="Confirm password"
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
                <hr />



                <div className="form-group">

                    <CompanyCollapsible />
                    <div>
                        <button
                            type="button"
                            className={activeCustomer ? (changePassword ? "btn btn-success fab-edit-active-password" : "btn btn-success fab-edit") : ("btn btn-success fab-add")}
                            onClick={handleClickNewCompany}
                        >
                            <i className="fas fa-plus"></i>
                        </button>

                    </div>
                </div>
                <hr />


                {activeCustomer &&
                    <div>
                        <div className="input-group mb-4">
                            <label className="input-group-text col-10">{changeEnableCustomer ? 'Enabled' : 'Disabled'}</label>
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <input type="checkbox" checked={changeEnableCustomer} onChange={handleEnableCustomer} />
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                }

                <div className="row justify-content-around">
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-block mt-3 col-5"
                        onClick={() => closeModal()}
                    >
                        <i className="far fa-window-close"></i>
                        <span>{' Close'}</span>
                    </button>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block mt-3 col-5"
                    >
                        <i className="far fa-save"></i>
                        <span>{(activeCustomer) ? 'Update Customer' : 'Register Customer'}</span>
                    </button>
                </div>
                

            </form>

        </Modal>
    )
}
