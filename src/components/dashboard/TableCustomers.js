import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import { useDispatch } from 'react-redux';
import { customerSetActive } from '../../actions/customers';
import { uiOpenModal } from '../../actions/ui';

export const TableCustomers = ({ customers }) => {

    const dispatch = useDispatch();

    const columns = [{
        dataField: 'Rut',
        text: 'Rut'
    }, {
        dataField: 'CustomerName',
        text: 'Cliente'
    }, {
        dataField: 'Email',
        text: 'Email'
    }];

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
          //   console.log(e);
          //   console.log(row);
          // console.log(`clicked on row with index: ${rowIndex}`);
          dispatch( customerSetActive( row ) );
        },
        onDoubleClick: (e, row, rowIndex) => {
          dispatch( uiOpenModal() );
        },
        // onContextMenu: (e, row, rowIndex) => {
        //   alert('onContextMenu')
        // },
        // onAuxClick: (e, row, rowIndex) => {
        //   alert('onAuxClick')
        // },
        
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
        <BootstrapTable keyField='Id' data={ customers } columns={ columns } rowEvents={ rowEvents } selectRow={ selectRow } rowStyle={ rowStyle } />
    )
}
