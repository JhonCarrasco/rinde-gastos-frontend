import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Swal from 'sweetalert2';

import { removeErrorCompany, setErrorCompany, uiCloseModalCompany } from '../../actions/ui';
import { clearActiveCompany, companyDeleted, companyStartAddNew, companyStartUpdate } from '../../actions/company';
import { getSelectedOption } from '../../helpers/getSelectedOption';
import { RulesCollapsible } from './RulesCollapsible';
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



const initCompany = {

    Id: null,
    Code: null || 'E1',
    Name: null || 'Empresa1',
    RindeGastosToken: null || 'abc123',
    ServiceLayerIntegration: null,
    DiApiLayerIntegration: null,
    DiApiLayerBaseUrl: null || '',
    SapServiceLayerBaseUrl: null || '',
    SapServiceLayerUserName: null || '',
    SapServiceLayerPassword: null || '',
    SapServiceLayerCompanyDB: null || '',
    SapServiceLayerNode: null || '',
    EnableIntegration: null || false,
    CreateInvoiceForExpense: null || false,
    InvoiceDraftForExpense: null || false,
    IncludeInvoiceForExpenseInJournal: null || false,
    CreateJournalForInvoice: null || false,
    ExtraFieldForDocumentType: null || '',
    ExtraFieldForProviderRut: null || '',
    ExtraFieldForDocumentNumber: null || '',
    LabelForInvoiceDocumentType: null || '',
    RindeGastosSapIndicator: null || '',
    AssignUserToJournalLine: null || false,
    AssignCenterToJournalLine: null || false,
    AssignProjectToJournalLine: null || false,
    AssignExpenseToInvoice: null || false,
    AssignIndicatorToJournal: null || false,
    IntegrationNotificationEmail: null || '',
    SendNotificationEmail: null || false,
    Testing: null || false,
    CategoriesAccounts: null || false,
    ExtraFieldAccounts: null || false,
    ExtraFieldForAccountOrigin: null,
    ExtraFieldForCreditAccountOrigin: null,
    ExtraFieldForProjectOrigin: null,
    ExtraFieldForCenterOrigin: null,
    ExtraFieldForProject: null,
    ExtraFieldForAccount: null,
    ExtraFieldForCreditAccount: null,
    ExtraFieldForCenterCost: null,
    AssignJournalToEmployee: null || false,
    UseCustomStatus: null || false,
    CustomStatus: null,
    ApplyCustomRules: null || false,
    CustomRules: null,
    TargetDocument: null || 'JournalEntry',
    CreateTargetDocumentForExpenses: null || false,
    ItemCodeOrigin: null,
    ExtraFieldForItemCodeOrigin: null,
    DocumentBusinessPartnerOrigin: null,
    ExtraFieldForDocumentBusinessPartner: null
}


export const CompanyModal = () => {

    const { companyModalOpen, companyMsgError } = useSelector(state => state.ui);
    const { activeCompany } = useSelector(state => state.company);
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState(initCompany);

    const [changeCreateInvoiceForExpense, setChangeCreateInvoiceForExpense] = useState(formValues.CreateInvoiceForExpense || false);
    const [changeAssignIndicatorToJournal, setChangeAssignIndicatorToJournal] = useState(formValues.AssignIndicatorToJournal || false);
    const [changeSendNotificationEmail, setChangeSendNotificationEmail] = useState(formValues.SendNotificationEmail || false);
    const [changeUseCustomStatus, setChangeUseCustomStatus] = useState(formValues.UseCustomStatus || false);
    const [changeApplyCustomRules, setChangeApplyCustomRules] = useState(formValues.ApplyCustomRules || false);

    useEffect(() => {
        // New or Update
        if (activeCompany) {
            setFormValues(activeCompany);
            const existRules = (activeCompany.CustomRules && activeCompany.CustomRules.length > 0) ? true: false;
            setChangeApplyCustomRules(existRules);
            
        } else {
            setFormValues(initCompany);
        }
    }, [activeCompany, setFormValues])



    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.checked
        });
    }

    const handleChangeCheckbox = ({ target }) => {
        if (target.name === 'CreateInvoiceForExpense') {
            setChangeCreateInvoiceForExpense(target.checked);
            setFormValues({
                ...formValues,
                CreateInvoiceForExpense: target.checked
            });
        } else if (target.name === 'CreateInvoiceForExpense' && !target.checked) {
            setChangeCreateInvoiceForExpense(target.checked);
            setFormValues({
                ...formValues,
                CreateInvoiceForExpense: target.checked,
                InvoiceDraftForExpense: false,
                IncludeInvoiceForExpenseInJournal: false,
                CreateJournalForInvoice: false,
                ExtraFieldForDocumentType: null,
                ExtraFieldForProviderRut: null,
                ExtraFieldForDocumentNumber: null,
                LabelForInvoiceDocumentType: null
            });
        }


        if (target.name === 'AssignIndicatorToJournal' && target.checked) {
            setChangeAssignIndicatorToJournal(target.checked);
            setFormValues({
                ...formValues,
                AssignIndicatorToJournal: target.checked
            });
        } else if (target.name === 'AssignIndicatorToJournal' && !target.checked) {
            setChangeAssignIndicatorToJournal(target.checked);
            setFormValues({
                ...formValues,
                AssignIndicatorToJournal: target.checked,
                RindeGastosSapIndicator: null
            });
        }


        if (target.name === 'SendNotificationEmail' && target.checked) {
            setChangeSendNotificationEmail(target.checked);
            setFormValues({
                ...formValues,
                SendNotificationEmail: target.checked
            });
        } else if (target.name === 'SendNotificationEmail' && !target.checked) {
            setChangeSendNotificationEmail(target.checked);
            setFormValues({
                ...formValues,
                SendNotificationEmail: target.checked,
                IntegrationNotificationEmail: null
            });
        }


        if (target.name === 'UseCustomStatus' && target.checked) {
            setChangeUseCustomStatus(target.checked);
            setFormValues({
                ...formValues,
                UseCustomStatus: target.checked
            });
        } else if (target.name === 'UseCustomStatus' && !target.checked) {
            setChangeUseCustomStatus(target.checked);
            setFormValues({
                ...formValues,
                UseCustomStatus: target.checked,
                CustomStatus: null
            });
        }



        if (target.name === 'ApplyCustomRules' && target.checked) {
            setChangeApplyCustomRules(target.checked);
            setFormValues({
                ...formValues,
                ApplyCustomRules: target.checked,
                CustomRules: []
            });
        } else if (target.name === 'ApplyCustomRules' && !target.checked) {
            setChangeApplyCustomRules(target.checked);
            setFormValues({
                ...formValues,
                ApplyCustomRules: target.checked,
                CustomRules: null
            });
        }


    }

    const handleChangeRadio = ({ target }) => {
        if (target.value === 'ServiceLayerIntegration') {
            setFormValues({
                ...formValues,
                ServiceLayerIntegration: true,
                DiApiLayerIntegration: false,
                DiApiLayerBaseUrl: null
            });
        } else if (target.value === 'DiApiLayerIntegration') {
            setFormValues({
                ...formValues,
                ServiceLayerIntegration: false,
                DiApiLayerIntegration: true,
                SapServiceLayerBaseUrl: null,
                SapServiceLayerUserName: null,
                SapServiceLayerPassword: null,
                SapServiceLayerCompanyDB: null,
                SapServiceLayerNode: null
            });
        }

        if (target.value === 'CategoriesAccounts') {
            setFormValues({
                ...formValues,
                CategoriesAccounts: true,
                ExtraFieldAccounts: false,
                ExtraFieldForAccountOrigin: null,
                ExtraFieldForCreditAccountOrigin: null,
                ExtraFieldForProjectOrigin: null,
                ExtraFieldForCenterOrigin: null,
                ExtraFieldForProject: null,
                ExtraFieldForAccount: null,
                ExtraFieldForCreditAccount: null,
                ExtraFieldForCenterCost: null
            });
        } else if (target.value === 'ExtraFieldAccounts') {
            setFormValues({
                ...formValues,
                CategoriesAccounts: false,
                ExtraFieldAccounts: true
            });
        }

    }

    const handleDropdown = (e) => {
        const option = getSelectedOption(e);
        setFormValues({
            ...formValues,
            [option.context]: option.label
        });

        if (option.context === 'TargetDocument' && option.label === 'JournalEntry') {
            setFormValues({
                ...formValues,
                TargetDocument: option.label,
                CreateTargetDocumentForExpenses: false,
                ItemCodeOrigin: null,
                ExtraFieldForItemCodeOrigin: null,
                DocumentBusinessPartnerOrigin: null,
                ExtraFieldForDocumentBusinessPartner: null
            })
        }

        if (option.context === 'TargetDocument' && option.label !== 'JournalEntry') {
            setFormValues({
                ...formValues,
                TargetDocument: option.label,
                CreateTargetDocumentForExpenses: false,
                ItemCodeOrigin: 'Category',
                ExtraFieldForItemCodeOrigin: null,
                DocumentBusinessPartnerOrigin: 'Employee',
                ExtraFieldForDocumentBusinessPartner: null
            })
        }


        if (option.context === 'ItemCodeOrigin' && option.label !== 'ExtraField') {

            setFormValues({
                ...formValues,
                ItemCodeOrigin: option.label,
                ExtraFieldForItemCodeOrigin: null
            })

        }

        if (option.context === 'DocumentBusinessPartnerOrigin' && option.label !== 'ExtraField') {

            setFormValues({
                ...formValues,
                DocumentBusinessPartnerOrigin: option.label,
                ExtraFieldForDocumentBusinessPartner: null
            })
        }


    }




    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch(uiCloseModalCompany());
        dispatch(clearActiveCompany());
        dispatch(ruleLogout());
        dispatch(removeErrorCompany());
        setFormValues(initCompany);
    }

    const isFormValid = () => {
        const errors = {};


        if (formValues.Code.trim().length === 0) {
            errors.Code = 'Code is required';
        }
        if (formValues.Name.trim().length === 0) {
            errors.Name = 'Name is required';
        }
        if (formValues.RindeGastosToken.trim().length === 0) {
            errors.RindeGastosToken = 'RindeGastosToken is required';
        }

        if (formValues.ServiceLayerIntegration === formValues.DiApiLayerIntegration) {
            errors.ServiceLayerIntegration = 'Select "ServiceLayerIntegration" or "DiApiLayerIntegration"';
        }
        if (formValues.DiApiLayerIntegration && (!formValues.DiApiLayerBaseUrl || formValues.DiApiLayerBaseUrl.trim().length === 0)) {
            errors.DiApiLayerBaseUrl = 'DiApiLayerBaseUrl is required';
        }
        if (formValues.ServiceLayerIntegration && formValues.SapServiceLayerBaseUrl.trim().length === 0) {
            errors.SapServiceLayerBaseUrl = 'SapServiceLayerBaseUrl is required';
        }
        if (formValues.ServiceLayerIntegration && formValues.SapServiceLayerUserName.trim().length === 0) {
            errors.SapServiceLayerUserName = 'SapServiceLayerUserName is required';
        }
        if (formValues.ServiceLayerIntegration && formValues.SapServiceLayerPassword.trim().length === 0) {
            errors.SapServiceLayerPassword = 'SapServiceLayerPassword is required';
        }
        if (formValues.ServiceLayerIntegration && formValues.SapServiceLayerCompanyDB.trim().length === 0) {
            errors.SapServiceLayerCompanyDB = 'SapServiceLayerCompanyDB is required';
        }
        if (formValues.ServiceLayerIntegration && formValues.SapServiceLayerNode.trim().length === 0) {
            errors.SapServiceLayerNode = 'SapServiceLayerNode is required';
        }

        if (formValues.AssignIndicatorToJournal && (!formValues.RindeGastosSapIndicator || formValues.RindeGastosSapIndicator.trim().length === 0)) {
            errors.RindeGastosSapIndicator = 'RindeGastosSapIndicator is required';
        }

        if (formValues.SendNotificationEmail && (!formValues.IntegrationNotificationEmail || formValues.IntegrationNotificationEmail.trim().length === 0)) {
            errors.IntegrationNotificationEmail = 'IntegrationNotificationEmail is required';
        }


        if (formValues.CategoriesAccounts === formValues.ExtraFieldAccounts) {
            errors.CategoriesAccounts = 'Select "CategoriesAccounts" or "ExtraFieldAccounts"';
        }
        if (formValues.ExtraFieldAccounts && (!formValues.ExtraFieldForAccountOrigin || formValues.ExtraFieldForAccountOrigin.trim().length === 0)) {
            errors.ExtraFieldForAccountOrigin = 'ExtraFieldForAccountOrigin is required';
        }
        if (formValues.ExtraFieldAccounts && (!formValues.ExtraFieldForCreditAccountOrigin || formValues.ExtraFieldForCreditAccountOrigin.trim().length === 0)) {
            errors.ExtraFieldForCreditAccountOrigin = 'ExtraFieldForCreditAccountOrigin is required';
        }
        if (formValues.ExtraFieldAccounts && (!formValues.ExtraFieldForProjectOrigin || formValues.ExtraFieldForProjectOrigin.trim().length === 0)) {
            errors.ExtraFieldForProjectOrigin = 'ExtraFieldForProjectOrigin is required';
        }
        if (formValues.ExtraFieldAccounts && (!formValues.ExtraFieldForCenterOrigin || formValues.ExtraFieldForCenterOrigin.trim().length === 0)) {
            errors.ExtraFieldForCenterOrigin = 'ExtraFieldForCenterOrigin is required';
        }
        if (formValues.ExtraFieldAccounts && (!formValues.ExtraFieldForProject || formValues.ExtraFieldForProject.trim().length === 0)) {
            errors.ExtraFieldForProject = 'ExtraFieldForProject is required';
        }
        if (formValues.ExtraFieldAccounts && (!formValues.ExtraFieldForAccount || formValues.ExtraFieldForAccount.trim().length === 0)) {
            errors.ExtraFieldForAccount = 'ExtraFieldForAccount is required';
        }
        if (formValues.ExtraFieldAccounts && (!formValues.ExtraFieldForCreditAccount || formValues.ExtraFieldForCreditAccount.trim().length === 0)) {
            errors.ExtraFieldForCreditAccount = 'ExtraFieldForCreditAccount is required';
        }
        if (formValues.ExtraFieldAccounts && (!formValues.ExtraFieldForCenterCost || formValues.ExtraFieldForCenterCost.trim().length === 0)) {
            errors.ExtraFieldForCenterCost = 'ExtraFieldForCenterCost is required';
        }


        if (formValues.UseCustomStatus && (!formValues.CustomStatus || formValues.CustomStatus.trim().length === 0)) {
            errors.CustomStatus = 'CustomStatus is required';
        }


        // ApplyCustomRules



        // TargetDocument
        if (formValues.ItemCodeOrigin === 'ExtraField' && (!formValues.ExtraFieldForItemCodeOrigin || formValues.ExtraFieldForItemCodeOrigin.trim().length === 0)) {
            errors.ExtraFieldForItemCodeOrigin = 'ExtraFieldForItemCodeOrigin is required';
        }
        if (formValues.DocumentBusinessPartnerOrigin === 'ExtraField' && (!formValues.ExtraFieldForDocumentBusinessPartner || formValues.ExtraFieldForDocumentBusinessPartner.trim().length === 0)) {
            errors.ExtraFieldForDocumentBusinessPartner = 'ExtraFieldForDocumentBusinessPartner is required';
        }


        dispatch(setErrorCompany(errors));

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


    const handleSubmitForm = (e) => {
        e.preventDefault();

        if (!isFormValid(formValues)) {
            return console.log('CompanyModal invalid...')
        }

        if (activeCompany) {
            
            dispatch(companyStartUpdate(formValues))
            dispatch(removeErrorCompany());
        } else {
            
            dispatch(companyStartAddNew(formValues));
            dispatch(removeErrorCompany());
        }



        closeModal();

    }

    const handleRemoveCompany = () => {
        dispatch(companyDeleted());
        closeModal();
    }



    return (
        <Modal

            isOpen={companyModalOpen}
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
            <h1> {(activeCompany) ? 'Edit Company' : 'Add Company'} </h1>
            <hr />

            <form
                className="container"
                onSubmit={handleSubmitForm}
            >


                {/* Code */}
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Code</span>
                    </div>
                    <input
                        type="text"
                        className={(companyMsgError && companyMsgError.Code) ? "form-control border border-danger" : "form-control"}
                        placeholder="Code"
                        name="Code"
                        autoComplete="off"
                        value={formValues.Code || ''}
                        onChange={handleInputChange}
                        readOnly={activeCompany ? true : false}
                    />
                </div>
                {/* Name */}
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Name</span>
                    </div>
                    <input
                        type="text"
                        className={(companyMsgError && companyMsgError.Name) ? "form-control border border-danger" : "form-control"}
                        placeholder="Name"
                        name="Name"
                        autoComplete="off"
                        value={formValues.Name || ''}
                        onChange={handleInputChange}
                    />
                </div>
                {/* RindeGastosToken */}
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">RindeGastosToken</span>
                    </div>
                    <input
                        type="text"
                        className={(companyMsgError && companyMsgError.RindeGastosToken) ? "form-control border border-danger" : "form-control"}
                        placeholder="RindeGastosToken"
                        name="RindeGastosToken"
                        autoComplete="off"
                        value={formValues.RindeGastosToken || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <hr />

                {/* Choose layer integration */}
                <fieldset
                    className={
                        (companyMsgError && (companyMsgError.ServiceLayerIntegration || companyMsgError.DiApiLayerIntegration))
                            ? "border border-danger p-3" : "border p-3"}>
                    <legend className="w-auto">Layer Integration</legend>
                    <div className="input-group mb-1">
                        <label className="input-group-text col-10">ServiceLayerIntegration</label>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <input
                                    type="radio"
                                    name="layerIntegration"
                                    value="ServiceLayerIntegration"
                                    checked={formValues.ServiceLayerIntegration || false}
                                    onChange={handleChangeRadio} />
                            </div>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text col-10">DiApiLayerIntegration</label>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <input
                                    type="radio"
                                    name="layerIntegration"
                                    value="DiApiLayerIntegration"
                                    checked={formValues.DiApiLayerIntegration || false}
                                    onChange={handleChangeRadio} />
                            </div>
                        </div>
                    </div>

                    {/* DiApiLayerBaseUrl */}
                    {formValues.DiApiLayerIntegration && (
                        <div>
                            <div className="input-group mb-4">

                                <div className="input-group-prepend">
                                    <span className="input-group-text">DiApiLayerBaseUrl</span>
                                </div>
                                <input
                                    type="text"
                                    className={(companyMsgError && companyMsgError.DiApiLayerBaseUrl) ? "form-control border border-danger" : "form-control"}
                                    placeholder="DiApiLayerBaseUrl"
                                    name="DiApiLayerBaseUrl"
                                    autoComplete="off"
                                    value={formValues.DiApiLayerBaseUrl || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>)
                    }

                    {/* SapServiceLayerBaseUrl */}
                    {formValues.ServiceLayerIntegration && (
                        <div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">SapServiceLayerBaseUrl</span>
                                </div>
                                <input
                                    type="text"
                                    className={(companyMsgError && companyMsgError.SapServiceLayerBaseUrl) ? "form-control border border-danger" : "form-control"}
                                    placeholder="SapServiceLayerBaseUrl"
                                    name="SapServiceLayerBaseUrl"
                                    autoComplete="off"
                                    value={formValues.SapServiceLayerBaseUrl || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">SapServiceLayerUserName</span>
                                </div>
                                <input
                                    type="text"
                                    className={(companyMsgError && companyMsgError.SapServiceLayerUserName) ? "form-control border border-danger" : "form-control"}
                                    placeholder="SapServiceLayerUserName"
                                    name="SapServiceLayerUserName"
                                    autoComplete="off"
                                    value={formValues.SapServiceLayerUserName || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">SapServiceLayerPassword</span>
                                </div>
                                <input
                                    type="text"
                                    className={(companyMsgError && companyMsgError.SapServiceLayerPassword) ? "form-control border border-danger" : "form-control"}
                                    placeholder="SapServiceLayerPassword"
                                    name="SapServiceLayerPassword"
                                    autoComplete="off"
                                    value={formValues.SapServiceLayerPassword || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">SapServiceLayerCompanyDB</span>
                                </div>
                                <input
                                    type="text"
                                    className={(companyMsgError && companyMsgError.SapServiceLayerCompanyDB) ? "form-control border border-danger" : "form-control"}
                                    placeholder="SapServiceLayerCompanyDB"
                                    name="SapServiceLayerCompanyDB"
                                    autoComplete="off"
                                    value={formValues.SapServiceLayerCompanyDB || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="input-group mb-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">SapServiceLayerNode</span>
                                </div>
                                <input
                                    type="text"
                                    className={(companyMsgError && companyMsgError.SapServiceLayerNode) ? "form-control border border-danger" : "form-control"}
                                    placeholder="SapServiceLayerNode"
                                    name="SapServiceLayerNode"
                                    autoComplete="off"
                                    value={formValues.SapServiceLayerNode || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    )}

                </fieldset>

                <hr />

                {/* EnableIntegration */}
                <div className="input-group mb-4">
                    <label className="input-group-text col-10">EnableIntegration</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="EnableIntegration" checked={formValues.EnableIntegration || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <hr />

                {/* CreateInvoiceForExpense */}
                <fieldset className="border p-3">
                    <legend className="w-auto">CreateInvoiceForExpense</legend>
                    <div className="input-group mb-3">
                        <label className="input-group-text col-10">CreateInvoiceForExpense</label>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <input type="checkbox" name="CreateInvoiceForExpense" checked={changeCreateInvoiceForExpense} onChange={handleChangeCheckbox} />
                            </div>
                        </div>
                    </div>
                    {changeCreateInvoiceForExpense && (
                        <div>
                            <div className="input-group mb-3">
                                <label className="input-group-text col-10">InvoiceDraftForExpense</label>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <input type="checkbox" name="InvoiceDraftForExpense" checked={formValues.InvoiceDraftForExpense || false} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <label className="input-group-text col-10">IncludeInvoiceForExpenseInJournal</label>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <input type="checkbox" name="IncludeInvoiceForExpenseInJournal" checked={formValues.IncludeInvoiceForExpenseInJournal || false} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <label className="input-group-text col-10">CreateJournalForInvoice</label>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <input type="checkbox" name="CreateJournalForInvoice" checked={formValues.CreateJournalForInvoice || false} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">ExtraFieldForDocumentType</span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="ExtraFieldForDocumentType"
                                    name="ExtraFieldForDocumentType"
                                    autoComplete="off"
                                    value={formValues.ExtraFieldForDocumentType || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">ExtraFieldForProviderRut</span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="ExtraFieldForProviderRut"
                                    name="ExtraFieldForProviderRut"
                                    autoComplete="off"
                                    value={formValues.ExtraFieldForProviderRut || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">ExtraFieldForDocumentNumber</span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="ExtraFieldForDocumentNumber"
                                    name="ExtraFieldForDocumentNumber"
                                    autoComplete="off"
                                    value={formValues.ExtraFieldForDocumentNumber || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="input-group mb-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">LabelForInvoiceDocumentType</span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="LabelForInvoiceDocumentType"
                                    name="LabelForInvoiceDocumentType"
                                    autoComplete="off"
                                    value={formValues.LabelForInvoiceDocumentType || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    )}
                </fieldset>

                <hr />

                {/* AssignUserToJournalLine */}
                <div className="input-group mb-3">
                    <label className="input-group-text col-10">AssignUserToJournalLine</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="AssignUserToJournalLine" checked={formValues.AssignUserToJournalLine || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                {/* AssignCenterToJournalLine */}
                <div className="input-group mb-3">
                    <label className="input-group-text col-10">AssignCenterToJournalLine</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="AssignCenterToJournalLine" checked={formValues.AssignCenterToJournalLine || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                {/* AssignProjectToJournalLine */}
                <div className="input-group mb-3">
                    <label className="input-group-text col-10">AssignProjectToJournalLine</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="AssignProjectToJournalLine" checked={formValues.AssignProjectToJournalLine || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                {/* AssignExpenseToInvoice */}
                <div className="input-group mb-3">
                    <label className="input-group-text col-10">AssignExpenseToInvoice</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="AssignExpenseToInvoice" checked={formValues.AssignExpenseToInvoice || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <hr />

                {/* AssignIndicatorToJournal */}
                <fieldset className="border p-3">
                    <legend className="w-auto">Assign Indicator To Journal</legend>
                    <div className="input-group mb-3">
                        <label className="input-group-text col-10">AssignIndicatorToJournal</label>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <input type="checkbox" name="AssignIndicatorToJournal" checked={changeAssignIndicatorToJournal} onChange={handleChangeCheckbox} />
                            </div>
                        </div>
                    </div>
                    {changeAssignIndicatorToJournal && (
                        <div className="input-group mb-4">
                            <div className="input-group-prepend">
                                <span className="input-group-text">RindeGastosSapIndicator</span>
                            </div>
                            <input
                                type="text"
                                className={(companyMsgError && companyMsgError.RindeGastosSapIndicator) ? "form-control border border-danger" : "form-control"}
                                placeholder="RindeGastosSapIndicator"
                                name="RindeGastosSapIndicator"
                                autoComplete="off"
                                value={formValues.RindeGastosSapIndicator || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    )}
                </fieldset>

                <hr />

                {/* SendNotificationEmail */}
                <fieldset className="border p-3">
                    <legend className="w-auto">Send Notification Email</legend>
                    <div className="input-group mb-3">
                        <label className="input-group-text col-10">SendNotificationEmail</label>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <input type="checkbox" name="SendNotificationEmail" checked={changeSendNotificationEmail || false} onChange={handleChangeCheckbox} />
                            </div>
                        </div>
                    </div>
                    {changeSendNotificationEmail && (
                        <div className="input-group mb-4">
                            <div className="input-group-prepend">
                                <span className="input-group-text">IntegrationNotificationEmail</span>
                            </div>
                            <input
                                type="text"
                                className={(companyMsgError && companyMsgError.IntegrationNotificationEmail) ? "form-control border border-danger" : "form-control"}
                                placeholder="IntegrationNotificationEmail"
                                name="IntegrationNotificationEmail"
                                autoComplete="off"
                                value={formValues.IntegrationNotificationEmail || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    )}
                </fieldset>

                <hr />

                {/* Testing */}
                <div className="input-group mb-3">
                    <label className="input-group-text col-10">Testing</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="Testing" checked={formValues.Testing || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                {/* Choose Account */}
                <fieldset
                    className={
                        (companyMsgError && (companyMsgError.CategoriesAccounts || companyMsgError.ExtraFieldAccounts))
                            ? "border border-danger p-3" : "border p-3"}>
                    <legend className="w-auto">Account</legend>
                    <div className="input-group mb-1">
                        <label className="input-group-text col-10">CategoriesAccounts</label>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <input type="radio" name="Account" value="CategoriesAccounts" checked={formValues.CategoriesAccounts || false} onChange={handleChangeRadio} />
                            </div>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text col-10">ExtraFieldAccounts</label>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <input type="radio" name="Account" value="ExtraFieldAccounts" checked={formValues.ExtraFieldAccounts || false} onChange={handleChangeRadio} />
                            </div>
                        </div>
                    </div>

                    {formValues.ExtraFieldAccounts && (
                        <div>
                            <div className="form-group row">
                                <DropdownButton
                                    className="col-8"
                                    id="ExtraFieldForAccountOrigin"
                                    variant="secondary"
                                    title="ExtraFieldForAccountOrigin"
                                >
                                    <Dropdown.Item eventKey="1" onSelect={handleDropdown} >Report</Dropdown.Item>
                                    <Dropdown.Item eventKey="2" onSelect={handleDropdown} >Expense</Dropdown.Item>
                                </DropdownButton>
                                <input
                                    type="text"
                                    className={(companyMsgError && companyMsgError.ExtraFieldForAccountOrigin) ? "form-control border border-danger col-3" : "form-control col-3"}
                                    placeholder="ExtraFieldForAccountOrigin"
                                    name="ExtraFieldForAccountOrigin"
                                    autoComplete="off"
                                    value={formValues.ExtraFieldForAccountOrigin || ''}
                                    onChange={handleInputChange}
                                    readOnly
                                />
                            </div>

                            <div className="form-group row">
                                <DropdownButton
                                    className="col-8"
                                    id="ExtraFieldForCreditAccountOrigin"
                                    variant="secondary"
                                    title="ExtraFieldForCreditAccountOrigin"
                                >
                                    <Dropdown.Item eventKey="3" onSelect={handleDropdown} >Report</Dropdown.Item>
                                    <Dropdown.Item eventKey="4" onSelect={handleDropdown} >Expense</Dropdown.Item>
                                </DropdownButton>
                                <input
                                    type="text"
                                    className={(companyMsgError && companyMsgError.ExtraFieldForCreditAccountOrigin) ? "form-control border border-danger col-3" : "form-control col-3"}
                                    placeholder="ExtraFieldForCreditAccountOrigin"
                                    name="ExtraFieldForCreditAccountOrigin"
                                    autoComplete="off"
                                    value={formValues.ExtraFieldForCreditAccountOrigin || ''}
                                    onChange={handleInputChange}
                                    readOnly
                                />
                            </div>

                            <div className="form-group row">
                                <DropdownButton
                                    className="col-8"
                                    id="ExtraFieldForProjectOrigin"
                                    variant="secondary"
                                    title="ExtraFieldForProjectOrigin"
                                >
                                    <Dropdown.Item eventKey="5" onSelect={handleDropdown} >Report</Dropdown.Item>
                                    <Dropdown.Item eventKey="6" onSelect={handleDropdown} >Expense</Dropdown.Item>
                                </DropdownButton>
                                <input
                                    type="text"
                                    className={(companyMsgError && companyMsgError.ExtraFieldForProjectOrigin) ? "form-control border border-danger col-3" : "form-control col-3"}
                                    placeholder="ExtraFieldForProjectOrigin"
                                    name="ExtraFieldForProjectOrigin"
                                    autoComplete="off"
                                    value={formValues.ExtraFieldForProjectOrigin || ''}
                                    onChange={handleInputChange}
                                    readOnly
                                />
                            </div>

                            <div className="form-group row">
                                <DropdownButton
                                    className="col-8"
                                    id="ExtraFieldForCenterOrigin"
                                    variant="secondary"
                                    title="ExtraFieldForCenterOrigin"
                                >
                                    <Dropdown.Item eventKey="7" onSelect={handleDropdown} >Report</Dropdown.Item>
                                    <Dropdown.Item eventKey="8" onSelect={handleDropdown} >Expense</Dropdown.Item>
                                </DropdownButton>
                                <input
                                    type="text"
                                    className={(companyMsgError && companyMsgError.ExtraFieldForCenterOrigin) ? "form-control border border-danger col-3" : "form-control col-3"}
                                    placeholder="ExtraFieldForCenterOrigin"
                                    name="ExtraFieldForCenterOrigin"
                                    autoComplete="off"
                                    value={formValues.ExtraFieldForCenterOrigin || ''}
                                    onChange={handleInputChange}
                                    readOnly
                                />
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">ExtraFieldForProject</span>
                                </div>
                                <input
                                    type="text"
                                    className={(companyMsgError && companyMsgError.ExtraFieldForProject) ? "form-control border border-danger" : "form-control"}
                                    placeholder="ExtraFieldForProject"
                                    name="ExtraFieldForProject"
                                    autoComplete="off"
                                    value={formValues.ExtraFieldForProject || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">ExtraFieldForAccount</span>
                                </div>
                                <input
                                    type="text"
                                    className={(companyMsgError && companyMsgError.ExtraFieldForAccount) ? "form-control border border-danger" : "form-control"}
                                    placeholder="ExtraFieldForAccount"
                                    name="ExtraFieldForAccount"
                                    autoComplete="off"
                                    value={formValues.ExtraFieldForAccount || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">ExtraFieldForCreditAccount</span>
                                </div>
                                <input
                                    type="text"
                                    className={(companyMsgError && companyMsgError.ExtraFieldForCreditAccount) ? "form-control border border-danger" : "form-control"}
                                    placeholder="ExtraFieldForCreditAccount"
                                    name="ExtraFieldForCreditAccount"
                                    autoComplete="off"
                                    value={formValues.ExtraFieldForCreditAccount || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="input-group mb-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">ExtraFieldForCenterCost</span>
                                </div>
                                <input
                                    type="text"
                                    className={(companyMsgError && companyMsgError.ExtraFieldForCenterCost) ? "form-control border border-danger" : "form-control"}
                                    placeholder="ExtraFieldForCenterCost"
                                    name="ExtraFieldForCenterCost"
                                    autoComplete="off"
                                    value={formValues.ExtraFieldForCenterCost || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    )}
                </fieldset>

                <hr />

                {/* AssignJournalToEmployee */}
                <div className="input-group mb-3">
                    <label className="input-group-text col-10">AssignJournalToEmployee</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="AssignJournalToEmployee" checked={formValues.AssignJournalToEmployee || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>


                {/* UseCustomStatus */}
                <fieldset className="border p-3">
                    <legend className="w-auto">Use Custom Status</legend>
                    <div className="input-group mb-3">
                        <label className="input-group-text col-10">UseCustomStatus</label>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <input type="checkbox" name="UseCustomStatus" checked={formValues.UseCustomStatus || false} onChange={handleChangeCheckbox} />
                            </div>
                        </div>
                    </div>
                    {changeUseCustomStatus && (
                        <div className="input-group mb-4">
                            <div className="input-group-prepend">
                                <span className="input-group-text">CustomStatus</span>
                            </div>
                            <input
                                type="text"
                                className={(companyMsgError && companyMsgError.CustomStatus) ? "form-control border border-danger" : "form-control"}
                                placeholder="CustomStatus"
                                name="CustomStatus"
                                autoComplete="off"
                                value={formValues.CustomStatus || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    )}
                </fieldset>

                <hr />


                {/* ApplyCustomRules */}
                <fieldset className="border p-3">
                    <legend className="w-auto">Apply Custom Rules</legend>
                    <div className="input-group mb-3">
                        <label className="input-group-text col-10">ApplyCustomRules</label>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <input type="checkbox" name="ApplyCustomRules" checked={formValues.ApplyCustomRules || false} onChange={handleChangeCheckbox} />
                            </div>
                        </div>
                    </div>
                    {changeApplyCustomRules && (
                        
                        <div className="form-group">

                            <RulesCollapsible />
                            
                        </div>

                    )}
                </fieldset>

                <hr />





                {/* TargetDocument */}
                <fieldset className="border p-3">
                    <legend className="w-auto">TargetDocument</legend>
                    <div className="form-group row">
                        <DropdownButton
                            className="col-8"
                            id="TargetDocument"
                            variant="secondary"
                            title="TargetDocument"
                        >
                            <Dropdown.Item eventKey="9" onSelect={handleDropdown} >JournalEntry</Dropdown.Item>
                            <Dropdown.Item eventKey="10" onSelect={handleDropdown} >Ticket</Dropdown.Item>
                            <Dropdown.Item eventKey="11" onSelect={handleDropdown} >ProviderInvoice</Dropdown.Item>
                        </DropdownButton>
                        <input
                            type="text"
                            className="form-control col-3"
                            placeholder="TargetDocument"
                            name="TargetDocument"
                            autoComplete="off"
                            value={formValues.TargetDocument || ''}
                            onChange={handleInputChange}
                            readOnly
                        />
                    </div>

                    {formValues.TargetDocument !== 'JournalEntry' && (
                        <div>
                            <div className="input-group mb-3">
                                <label className="input-group-text col-10">CreateTargetDocumentForExpenses</label>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <input type="checkbox" name="CreateTargetDocumentForExpenses" checked={formValues.CreateTargetDocumentForExpenses || false} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>





                            <div className="form-group row">
                                <DropdownButton
                                    className="col-8"
                                    id="ItemCodeOrigin"
                                    variant="secondary"
                                    title="ItemCodeOrigin"
                                >
                                    <Dropdown.Item eventKey="12" onSelect={handleDropdown} >Category</Dropdown.Item>
                                    <Dropdown.Item eventKey="13" onSelect={handleDropdown} >ExtraField</Dropdown.Item>
                                </DropdownButton>
                                <input
                                    type="text"
                                    className="form-control col-3"
                                    placeholder="ItemCodeOrigin"
                                    name="ItemCodeOrigin"
                                    autoComplete="off"
                                    value={formValues.ItemCodeOrigin || ''}
                                    onChange={handleInputChange}
                                    readOnly
                                />
                            </div>
                            {formValues.ItemCodeOrigin !== 'Category' && (
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">ExtraFieldForItemCodeOrigin</span>
                                    </div>
                                    <input
                                        type="text"
                                        className={(companyMsgError && companyMsgError.ExtraFieldForItemCodeOrigin) ? "form-control border border-danger" : "form-control"}
                                        placeholder="ExtraFieldForItemCodeOrigin"
                                        name="ExtraFieldForItemCodeOrigin"
                                        autoComplete="off"
                                        value={formValues.ExtraFieldForItemCodeOrigin || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            )}



                            <div className="form-group row">
                                <DropdownButton
                                    className="col-8"
                                    id="DocumentBusinessPartnerOrigin"
                                    variant="secondary"
                                    title="DocumentBusinessPartnerOrigin"
                                >
                                    <Dropdown.Item eventKey="14" onSelect={handleDropdown} >Employee</Dropdown.Item>
                                    <Dropdown.Item eventKey="15" onSelect={handleDropdown} >ExtraField</Dropdown.Item>
                                </DropdownButton>
                                <input
                                    type="text"
                                    className="form-control col-3"
                                    placeholder="DocumentBusinessPartnerOrigin"
                                    name="DocumentBusinessPartnerOrigin"
                                    autoComplete="off"
                                    value={formValues.DocumentBusinessPartnerOrigin || ''}
                                    onChange={handleInputChange}
                                    readOnly
                                />
                            </div>
                            {formValues.DocumentBusinessPartnerOrigin !== 'Employee' && (
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">ExtraFieldForDocumentBusinessPartner</span>
                                    </div>
                                    <input
                                        type="text"
                                        className={(companyMsgError && companyMsgError.ExtraFieldForDocumentBusinessPartner) ? "form-control border border-danger" : "form-control"}
                                        placeholder="ExtraFieldForDocumentBusinessPartner"
                                        name="ExtraFieldForDocumentBusinessPartner"
                                        autoComplete="off"
                                        value={formValues.ExtraFieldForDocumentBusinessPartner || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            )}

                        </div>
                    )}
                </fieldset>

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
                    {activeCompany &&
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-block mt-3 col-5"
                            onClick={handleRemoveCompany}
                        >
                            <i className="far fa-trash-alt"></i>
                            <span>{' Remover Company'}</span>
                        </button>
                    }

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block mt-3 col-5"
                    >
                        <i className="far fa-save"></i>
                        <span>{(activeCompany) ? ' Update Company' : ' Register Company'}</span>
                    </button>
                </div>


            </form>

        </Modal>
    )
}
