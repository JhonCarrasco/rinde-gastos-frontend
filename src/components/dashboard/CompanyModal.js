import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Modal from 'react-modal';

// import validator from 'validator';
// import Swal from 'sweetalert2';
import { removeErrorCompany, setErrorCompany, uiCloseModalCompany } from '../../actions/ui';
import { clearActiveCompany, companyStartAddNew, companyStartUpdate } from '../../actions/company';



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

    Id: '',
    Code: '',
    Name: '',
    RindeGastosToken: '',
    ServiceLayerIntegration: null,
    DiApiLayerIntegration: null,
    DiApiLayerBaseUrl: '',
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
    RindeGastosSapIndicator: '',
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
    TargetDocument: '',
    CreateTargetDocumentForExpenses: null,
    ItemCodeOrigin: '',
    ExtraFieldForItemCodeOrigin: null,
    DocumentBusinessPartnerOrigin: '',
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

    const handleRole = (RoleSelected) => {
        setFormValues({
            ...formValues,
            Role: RoleSelected
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


        // if ( activeCompany ) {
        //     dispatch( companyStartUpdate( formValues ) )
        // } else {
        //     dispatch( companyStartAddNew( formValues ) );
        // }



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

                <div className="form-group">
                    <label>Code</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Code"
                        name="Code"
                        autoComplete="off"
                        value={formValues.Code}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name="Name"
                        autoComplete="off"
                        value={formValues.Name}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>RindeGastosToken</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="RindeGastosToken"
                        name="RindeGastosToken"
                        autoComplete="off"
                        value={formValues.RindeGastosToken}
                        onChange={handleInputChange}
                    />
                </div>



                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input" />
                        </div>
                    </div>
                    <input type="text" className="form-control" aria-label="Text input with checkbox" />
                </div>

                {/* <div className="form-group">                    
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
                </div> */}





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
