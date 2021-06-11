import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import { useDispatch, useSelector } from 'react-redux';
import { companySetActive } from '../../actions/company';
import { uiOpenModalCompany } from '../../actions/ui';


export const TableCompanies = () => {

  const { companies } = useSelector(state => state.company);
    const dispatch = useDispatch();

    



    const columns = [{
        dataField: 'Name',
        text: 'Nombre Empresas'
    }
  ];

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
          dispatch( companySetActive( row ) );
        },
        onDoubleClick: (e, row, rowIndex) => {
          dispatch( uiOpenModalCompany() );
        }        
      };

      const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        hideSelectColumn: true,
        bgColor: '#33FCFF',
        selectionRenderer: ({ mode, ...rest }) => (
            <input type={ mode } { ...rest } />
          )
      };

      const rowStyle = (row, rowIndex) => {
          
        return rowIndex%2 === 0 ? { backgroundColor: '#d0d0d0' } : { backgroundColor: 'white' };
      };
      

      
    return (
      <BootstrapTable keyField='Code' data={ companies } columns={ columns } rowEvents={ rowEvents } selectRow={ selectRow } rowStyle={ rowStyle } />
    )
}
