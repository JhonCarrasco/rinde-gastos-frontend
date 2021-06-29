import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Swal from 'sweetalert2';


import { getSelectedOption } from '../../helpers/getSelectedOption';
import { removeErrorRule, setErrorRule, uiCloseModalRule } from '../../actions/ui';
import { clearActiveRule, ruleAddNew, ruleDeleted, ruleUpdated } from '../../actions/rule';



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

const initCustomRule = {
    Type: null || 'Account',
    RuleFieldName: null,
    RuleFieldOrigin: null || 'Code',
    RuleFieldValue: null,
    RuleAccount: null,
    AssignAnotherAccount: null || false,
    AssignToProvider: null || false,
    ProviderFieldName: null,
    AssignDocumentNumber: null || false,
    DocumentNumberFieldName: null,
    AnotherAccount: null
}



export const RulesModal = () => {

    const { ruleModalOpen, ruleMsgError } = useSelector(state => state.ui);
    const { activeRule } = useSelector(state => state.rule);
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState(initCustomRule);

    const [changeAssignToProvider, setChangeAssignToProvider] = useState(formValues.AssignToProvider || false);
    const [changeAssignDocumentNumber, setChangeAssignDocumentNumber] = useState(formValues.AssignDocumentNumber || false);
    const [changeAssignAnotherAccount, setChangeAssignAnotherAccount] = useState(formValues.AssignAnotherAccount || false);

    
    useEffect(() => {
        // New or Update
        if (activeRule) {
            setFormValues(activeRule);
        } else {
            setFormValues(initCustomRule);
        }
    }, [ activeRule, setFormValues])



    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    
    const handleChangeCheckbox = ({ target }) => {
        
        if (target.name === 'AssignToProvider' && target.checked) {
            setChangeAssignToProvider(target.checked);
            setFormValues({
                ...formValues,
                AssignToProvider: target.checked
            });
        } else if (target.name === 'AssignToProvider' && !target.checked) {
            setChangeAssignToProvider(target.checked);
            setFormValues({
                ...formValues,
                AssignToProvider: target.checked,
                ProviderFieldName: null
            });
        }

        if (target.name === 'AssignDocumentNumber' && target.checked) {
            setChangeAssignDocumentNumber(target.checked);
            setFormValues({
                ...formValues,
                AssignDocumentNumber: target.checked
            });
        } else if (target.name === 'AssignDocumentNumber' && !target.checked) {
            setChangeAssignDocumentNumber(target.checked);
            setFormValues({
                ...formValues,
                AssignDocumentNumber: target.checked,
                DocumentNumberFieldName: null
            });
        }

        if (target.name === 'AssignAnotherAccount' && target.checked) {
            setChangeAssignAnotherAccount(target.checked);
            setFormValues({
                ...formValues,
                AssignAnotherAccount: target.checked
            });
        } else if (target.name === 'AssignAnotherAccount' && !target.checked) {
            setChangeAssignAnotherAccount(target.checked);
            setFormValues({
                ...formValues,
                AssignAnotherAccount: target.checked,
                AnotherAccount: null
            });
        }
        
    }


    const handleDropdown = (e) => {
        const option = getSelectedOption(e);

        setFormValues({
            ...formValues,
            [option.context]: option.label
        });

        if (option.context === 'Type' && option.label === 'Account') {
            setFormValues({
                ...formValues,
                Type: option.label,
                RuleFieldName: null
            })
        }

        if (option.context === 'Type' && option.label === 'ExtraField') {
            setFormValues({
                ...formValues,
                Type: option.label,
                RuleFieldName: null
            })
        }


    }




    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch(uiCloseModalRule());
        dispatch(clearActiveRule());
        dispatch(removeErrorRule());
        setFormValues(initCustomRule);
    }

    const isFormValid = () => {
        const errors = {};

        if (formValues.Type === 'Account' && (!formValues.RuleAccount || formValues.RuleAccount.trim().length === 0)) {
            errors.RuleAccount = 'RuleAccount es requerido';
        }
        if (formValues.Type === 'ExtraField' && (!formValues.RuleFieldName || formValues.RuleFieldName.trim().length === 0)) {
            errors.RuleFieldName = 'RuleFieldName es requerido';
        }
        if (formValues.RuleFieldOrigin && (!formValues.RuleFieldValue || formValues.RuleFieldValue.trim().length === 0)) {
            errors.RuleFieldValue = 'RuleFieldValue es requerido';
        }
        if (formValues.AssignAnotherAccount && (!formValues.AnotherAccount || formValues.AnotherAccount.trim().length === 0)) {
            errors.AnotherAccount = 'AnotherAccount es requerido';
        }
        if (formValues.AssignToProvider && (!formValues.ProviderFieldName || formValues.ProviderFieldName.trim().length === 0)) {
            errors.ProviderFieldName = 'ProviderFieldName es requerido';
        }
        if (formValues.AssignDocumentNumber && (!formValues.DocumentNumberFieldName || formValues.DocumentNumberFieldName.trim().length === 0)) {
            errors.DocumentNumberFieldName = 'DocumentNumberFieldName es requerido';
        }
        



        dispatch(setErrorRule(errors));

        if (Object.entries(errors).length !== 0) {
            const list = document.createElement('ul');
            const messages = Object.entries(errors);
            messages.forEach(([key, value]) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = value;
                list.appendChild(listItem);
            });
            Swal.fire('Campos requeridos o invalidos', list, 'error');
            return false;
        }
        else {
            return true;
        }
    }


    const handleSubmitForm = (e) => {
        e.preventDefault();

        if (!isFormValid(formValues)) {
            return console.log('invalido rules')
        }

        if (activeRule) {
            dispatch(ruleUpdated(formValues))
            dispatch(removeErrorRule());
        } else {
            console.log('formValues', formValues)
            dispatch(ruleAddNew(formValues));
            dispatch(removeErrorRule());
        }

        console.log('Rule', formValues)

        closeModal();

    }

    const handleRemoveRule = () => {
        dispatch(ruleDeleted());
        closeModal();
    }


    

    return (
        <Modal

            isOpen={ruleModalOpen}
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
            <h1> {(activeRule) ? 'Edit Rule' : 'Add Rule'} </h1>
            <hr />

            <form
                className="container"
                onSubmit={handleSubmitForm}
            >

                {/* Type */}
                <div className="form-group row">
                    <DropdownButton
                        className="col-8"
                        id="Type"
                        variant="secondary"
                        title="Type"
                    >
                        <Dropdown.Item eventKey="16" onSelect={handleDropdown} >Account</Dropdown.Item>
                        <Dropdown.Item eventKey="17" onSelect={handleDropdown} >ExtraField</Dropdown.Item>
                    </DropdownButton>
                    <input
                        type="text"
                        className="form-control col-3"
                        placeholder="Type"
                        name="Type"
                        autoComplete="off"
                        value={formValues.Type || ''}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
                {formValues.Type !== 'Account' && (
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">RuleFieldName</span>
                        </div>
                        <input
                            type="text"
                            className={(ruleMsgError && ruleMsgError.RuleFieldName) ? "form-control border border-danger" : "form-control"}
                            placeholder="RuleFieldName"
                            name="RuleFieldName"
                            autoComplete="off"
                            value={formValues.RuleFieldName || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                )}

                {/* RuleAccount */}
                {formValues.Type === 'Account' && (
                    <div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">RuleAccount</span>
                            </div>
                            <input
                                type="text"
                                className={(ruleMsgError && ruleMsgError.RuleAccount) ? "form-control border border-danger" : "form-control"}
                                placeholder="RuleAccount"
                                name="RuleAccount"
                                autoComplete="off"
                                value={formValues.RuleAccount || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                )}                
                <hr />

                {/* RuleFieldOrigin */}
                <div className="form-group row">
                    <DropdownButton
                        className="col-8"
                        id="RuleFieldOrigin"
                        variant="secondary"
                        title="RuleFieldOrigin"
                    >
                        <Dropdown.Item eventKey="18" onSelect={handleDropdown} >Code</Dropdown.Item>
                        <Dropdown.Item eventKey="19" onSelect={handleDropdown} >Value</Dropdown.Item>
                    </DropdownButton>
                    <input
                        type="text"
                        className={(ruleMsgError && ruleMsgError.RuleFieldOrigin) ? "form-control border border-danger col-3" : "form-control col-3"}
                        placeholder="RuleFieldOrigin"
                        name="RuleFieldOrigin"
                        autoComplete="off"
                        value={formValues.RuleFieldOrigin || ''}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>

                {/* RuleFieldValue */}
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">RuleFieldValue</span>
                    </div>
                    <input
                        type="text"
                        className={(ruleMsgError && ruleMsgError.RuleFieldValue) ? "form-control border border-danger" : "form-control"}
                        placeholder="RuleFieldValue"
                        name="RuleFieldValue"
                        autoComplete="off"
                        value={formValues.RuleFieldValue || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <hr />
       
                {/* AssignAnotherAccount */}
                <div className="input-group mb-3">
                    <label className="input-group-text col-10">AssignAnotherAccount</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="AssignAnotherAccount" checked={changeAssignAnotherAccount || false} onChange={handleChangeCheckbox} />
                        </div>
                    </div>
                </div>
                {changeAssignAnotherAccount && (
                    <div className="input-group mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text">AnotherAccount</span>
                        </div>
                        <input
                            type="text"
                            className={(ruleMsgError && ruleMsgError.AnotherAccount) ? "form-control border border-danger" : "form-control"}
                            placeholder="AnotherAccount"
                            name="AnotherAccount"
                            autoComplete="off"
                            value={formValues.AnotherAccount || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                )}
                <hr />

                {/* AssignToProvider */}
                <div className="input-group mb-3">
                    <label className="input-group-text col-10">AssignToProvider</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="AssignToProvider" checked={changeAssignToProvider || false} onChange={handleChangeCheckbox} />
                        </div>
                    </div>
                </div>
                {changeAssignToProvider && (
                    <div className="input-group mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text">ProviderFieldName</span>
                        </div>
                        <input
                            type="text"
                            className={(ruleMsgError && ruleMsgError.ProviderFieldName) ? "form-control border border-danger" : "form-control"}
                            placeholder="ProviderFieldName"
                            name="ProviderFieldName"
                            autoComplete="off"
                            value={formValues.ProviderFieldName || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                )}
                <hr />

                {/* AssignDocumentNumber */}
                <div className="input-group mb-3">
                    <label className="input-group-text col-10">AssignDocumentNumber</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="AssignDocumentNumber" checked={changeAssignDocumentNumber || false} onChange={handleChangeCheckbox} />
                        </div>
                    </div>
                </div>
                {changeAssignDocumentNumber && (
                    <div className="input-group mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text">DocumentNumberFieldName</span>
                        </div>
                        <input
                            type="text"
                            className={(ruleMsgError && ruleMsgError.DocumentNumberFieldName) ? "form-control border border-danger" : "form-control"}
                            placeholder="DocumentNumberFieldName"
                            name="DocumentNumberFieldName"
                            autoComplete="off"
                            value={formValues.DocumentNumberFieldName || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                )}
                <hr />




                <div className="row justify-content-around">
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-block mt-3 col-5"
                        onClick={() => closeModal()}
                    >
                        <i className="far fa-trash-alt"></i>
                        <span>{' Close'}</span>
                    </button>

                    {activeRule &&
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-block mt-3 col-5"
                            onClick={handleRemoveRule}
                        >
                            <i className="far fa-trash-alt"></i>
                            <span>{' Remover Rule'}</span>
                        </button>
                    }

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block mt-3 col-5"
                    >
                        <i className="far fa-save"></i>
                        <span>{(activeRule) ? ' Update Rule' : ' Register Rule'}</span>
                    </button>
                </div>


            </form>

        </Modal>
    )
}
