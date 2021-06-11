import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import { useDispatch, useSelector } from 'react-redux';
import { customerSetActive } from '../../actions/customers';
// import { uiOpenModal } from '../../actions/ui';

export const TableCompanies = () => {

  const { activeCustomer } = useSelector(state => state.customer);
    const dispatch = useDispatch();

    const { Companies } = activeCustomer;


    const columns = [{
        dataField: 'Name',
        text: 'Nombre Empresas'
    }
  ];

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
          console.log("click compañia")
          // dispatch( customerSetActive( row ) );
        },
        onDoubleClick: (e, row, rowIndex) => {
          console.log("doble click compañia")
          // dispatch( uiOpenModal() );
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
      

      console.log(Companies)
    return (
        <BootstrapTable keyField='Code' data={ Companies } columns={ columns } rowEvents={ rowEvents } selectRow={ selectRow } rowStyle={ rowStyle } />
    )
}
