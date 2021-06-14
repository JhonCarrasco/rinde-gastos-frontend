import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Modal from 'react-modal';

// import validator from 'validator';
// import Swal from 'sweetalert2';
import { removeErrorCompany, setErrorCompany, uiCloseModalCompany } from '../../actions/ui';
import { clearActiveCompany, companyAddNew, companyStartAddNew, companyStartUpdate, companyUpdated } from '../../actions/company';



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
    Code: 'E1',
    Name: 'Empresa1',
    RindeGastosToken: 'abc123',
    ServiceLayerIntegration: true,
    DiApiLayerIntegration: null,
    DiApiLayerBaseUrl: 'http://localhost:3000',
    SapServiceLayerBaseUrl: null,
    SapServiceLayerUserName: null,
    SapServiceLayerPassword: null,
    SapServiceLayerCompanyDB: null,
    SapServiceLayerNode: null,
    EnableIntegration: null,
    CreateInvoiceForExpense: null,
    InvoiceDraftForExpense: null,
    IncludeInvoiceForExpenseInJournal: null,
    CreateJournalForInvoice: null,
    ExtraFieldForDocumentType: null,
    ExtraFieldForProviderRut: null,
    ExtraFieldForDocumentNumber: null,
    LabelForInvoiceDocumentType: null,
    RindeGastosSapIndicator: null,
    AssignUserToJournalLine: null,
    AssignCenterToJournalLine: null,
    AssignProjectToJournalLine: null,
    AssignExpenseToInvoice: null,
    AssignIndicatorToJournal: null,
    IntegrationNotificationEmail: null,
    SendNotificationEmail: null,
    Testing: null,
    CategoriesAccounts: null,
    ExtraFieldAccounts: null,
    ExtraFieldForAccountOrigin: null,
    ExtraFieldForCreditAccountOrigin: null,
    ExtraFieldForProjectOrigin: null,
    ExtraFieldForCenterOrigin: null,
    ExtraFieldForProject: null,
    ExtraFieldForAccount: null,
    ExtraFieldForCreditAccount: null,
    ExtraFieldForCenterCost: null,
    AssignJournalToEmployee: null,
    UseCustomStatus: null,
    CustomStatus: null,
    ApplyCustomRules: null,
    CustomRules: null,
    TargetDocument: null,
    CreateTargetDocumentForExpenses: null,
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


    useEffect(() => {
        // New or Update
        if (activeCompany) {
            setFormValues(activeCompany);
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

    const handleChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.checked
        })
    }


    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch(uiCloseModalCompany());
        dispatch(clearActiveCompany());
        setFormValues(initCompany);
    }

    const isFormValid = () => {

        // if (Rut.trim().length === 0) {
        //     dispatch(setErrorCompany('Rut es requerido'))
        //     return false;
        // } else if (CustomerName.trim().length === 0) {
        //     dispatch(setErrorCompany('Nombre es requerido'))
        //     return false;
        // } else if (!validator.isEmail(Email)) {
        //     dispatch(setErrorCompany('Email no es valido'))
        //     return false;
        // } else if (Role.trim().length === 0) {
        //     dispatch(setErrorCompany('Rol es requerido'))
        //     return false;
        // }

        dispatch(removeErrorCompany());
        return true;
    }




    const handleSubmitForm = (e) => {
        e.preventDefault();

        if (!isFormValid(formValues)) {
            return console.log('invalido company')
        }
        else {
            console.log('valido company')
        }


        if ( activeCompany ) {            
            dispatch( companyUpdated( formValues ) )
        } else {
            dispatch( companyAddNew( formValues ) );            
        }



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
            <h1> {(activeCompany) ? 'Editar Empresa' : 'Nuevo Empresa'} </h1>
            <hr />
            <form
                className="container"
                onSubmit={handleSubmitForm}
            >
                {
                    companyMsgError &&
                    (
                        <div className="alert-error">
                            {companyMsgError}
                        </div>
                    )
                }

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Code</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Code"
                        name="Code"
                        autoComplete="off"
                        value={formValues.Code || ''}
                        onChange={handleInputChange}
                        readOnly={activeCompany ? true : false}
                    />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Name</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name="Name"
                        autoComplete="off"
                        value={formValues.Name || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">RindeGastosToken</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="RindeGastosToken"
                        name="RindeGastosToken"
                        autoComplete="off"
                        value={formValues.RindeGastosToken || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text col-10">ServiceLayerIntegration</span>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="ServiceLayerIntegration" checked={formValues.ServiceLayerIntegration || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text col-10">DiApiLayerIntegration</span>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="DiApiLayerIntegration" checked={formValues.DiApiLayerIntegration || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">DiApiLayerBaseUrl</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="DiApiLayerBaseUrl"
                        name="DiApiLayerBaseUrl"
                        autoComplete="off"
                        value={formValues.DiApiLayerBaseUrl || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">SapServiceLayerBaseUrl</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
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
                        className="form-control"
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
                        className="form-control"
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
                        className="form-control"
                        placeholder="SapServiceLayerCompanyDB"
                        name="SapServiceLayerCompanyDB"
                        autoComplete="off"
                        value={formValues.SapServiceLayerCompanyDB || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">SapServiceLayerNode</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="SapServiceLayerNode"
                        name="SapServiceLayerNode"
                        autoComplete="off"
                        value={formValues.SapServiceLayerNode || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text col-10">EnableIntegration</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="EnableIntegration" checked={formValues.EnableIntegration || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text col-10">CreateInvoiceForExpense</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="CreateInvoiceForExpense" checked={formValues.CreateInvoiceForExpense || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>

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

                <div className="input-group mb-3">
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

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">RindeGastosSapIndicator</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="RindeGastosSapIndicator"
                        name="RindeGastosSapIndicator"
                        autoComplete="off"
                        value={formValues.RindeGastosSapIndicator || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text col-10">AssignUserToJournalLine</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="AssignUserToJournalLine" checked={formValues.AssignUserToJournalLine || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text col-10">AssignCenterToJournalLine</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="AssignCenterToJournalLine" checked={formValues.AssignCenterToJournalLine || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text col-10">AssignProjectToJournalLine</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="AssignProjectToJournalLine" checked={formValues.AssignProjectToJournalLine || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text col-10">AssignExpenseToInvoice</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="AssignExpenseToInvoice" checked={formValues.AssignExpenseToInvoice || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text col-10">AssignIndicatorToJournal</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="AssignIndicatorToJournal" checked={formValues.AssignIndicatorToJournal || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">IntegrationNotificationEmail</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="IntegrationNotificationEmail"
                        name="IntegrationNotificationEmail"
                        autoComplete="off"
                        value={formValues.IntegrationNotificationEmail || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text col-10">SendNotificationEmail</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="SendNotificationEmail" checked={formValues.SendNotificationEmail || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text col-10">Testing</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="Testing" checked={formValues.Testing || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text col-10">CategoriesAccounts</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="CategoriesAccounts" checked={formValues.CategoriesAccounts || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text col-10">ExtraFieldAccounts</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="ExtraFieldAccounts" checked={formValues.ExtraFieldAccounts || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">ExtraFieldForAccountOrigin</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="ExtraFieldForAccountOrigin"
                        name="ExtraFieldForAccountOrigin"
                        autoComplete="off"
                        value={formValues.ExtraFieldForAccountOrigin || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">ExtraFieldForCreditAccountOrigin</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="ExtraFieldForCreditAccountOrigin"
                        name="ExtraFieldForCreditAccountOrigin"
                        autoComplete="off"
                        value={formValues.ExtraFieldForCreditAccountOrigin || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">ExtraFieldForProjectOrigin</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="ExtraFieldForProjectOrigin"
                        name="ExtraFieldForProjectOrigin"
                        autoComplete="off"
                        value={formValues.ExtraFieldForProjectOrigin || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">ExtraFieldForCenterOrigin</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="ExtraFieldForCenterOrigin"
                        name="ExtraFieldForCenterOrigin"
                        autoComplete="off"
                        value={formValues.ExtraFieldForCenterOrigin || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">ExtraFieldForProject</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
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
                        className="form-control"
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
                        className="form-control"
                        placeholder="ExtraFieldForCreditAccount"
                        name="ExtraFieldForCreditAccount"
                        autoComplete="off"
                        value={formValues.ExtraFieldForCreditAccount || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">ExtraFieldForCenterCost</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="ExtraFieldForCenterCost"
                        name="ExtraFieldForCenterCost"
                        autoComplete="off"
                        value={formValues.ExtraFieldForCenterCost || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text col-10">AssignJournalToEmployee</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="AssignJournalToEmployee" checked={formValues.AssignJournalToEmployee || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text col-10">UseCustomStatus</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="UseCustomStatus" checked={formValues.UseCustomStatus || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">CustomStatus</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="CustomStatus"
                        name="CustomStatus"
                        autoComplete="off"
                        value={formValues.CustomStatus || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text col-10">ApplyCustomRules</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="ApplyCustomRules" value={formValues.ApplyCustomRules || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>
  
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">CustomRules</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="CustomRules"
                        name="CustomRules"
                        autoComplete="off"
                        value={formValues.CustomRules || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">TargetDocument</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="TargetDocument"
                        name="TargetDocument"
                        autoComplete="off"
                        value={formValues.TargetDocument || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text col-10">CreateTargetDocumentForExpenses</label>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <input type="checkbox" name="CreateTargetDocumentForExpenses" checked={formValues.CreateTargetDocumentForExpenses || false} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">ItemCodeOrigin</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="ItemCodeOrigin"
                        name="ItemCodeOrigin"
                        autoComplete="off"
                        value={formValues.ItemCodeOrigin || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">ExtraFieldForItemCodeOrigin</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="ExtraFieldForItemCodeOrigin"
                        name="ExtraFieldForItemCodeOrigin"
                        autoComplete="off"
                        value={formValues.ExtraFieldForItemCodeOrigin || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">DocumentBusinessPartnerOrigin</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="DocumentBusinessPartnerOrigin"
                        name="DocumentBusinessPartnerOrigin"
                        autoComplete="off"
                        value={formValues.DocumentBusinessPartnerOrigin || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">ExtraFieldForDocumentBusinessPartner</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="ExtraFieldForDocumentBusinessPartner"
                        name="ExtraFieldForDocumentBusinessPartner"
                        autoComplete="off"
                        value={formValues.ExtraFieldForDocumentBusinessPartner || ''}
                        onChange={handleInputChange}
                    />
                </div>




                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block mt-3"
                >
                    <i className="far fa-save"></i>
                    <span>{(activeCompany) ? 'Actualizar Empresa' : 'Registrar Empresa'}</span>
                </button>

            </form>

        </Modal>
    )
}
