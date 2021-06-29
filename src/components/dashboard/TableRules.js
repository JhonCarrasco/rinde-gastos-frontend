import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import { useDispatch, useSelector } from 'react-redux';
import { ruleSetActive } from '../../actions/rule';
import { uiOpenModalRule } from '../../actions/ui';


export const TableRules = () => {

  const { rules } = useSelector(state => state.rule);
    const dispatch = useDispatch();

    



    const columns = [
      {
        dataField: 'Type',
        text: 'Type',
        headerStyle: { fontSize: '13px' }
      },
      {
        dataField: 'RuleFieldName',
        text: 'FieldName',
        headerStyle: { fontSize: '13px' }
      },
      {
        dataField: 'RuleAccount',
        text: 'Account',
        headerStyle: { fontSize: '13px' }
      },
      {
        dataField: 'RuleFieldOrigin',
        text: 'FieldOrigin',
        headerStyle: { fontSize: '13px' }
      },
      {
        dataField: 'RuleFieldValue',
        text: 'FieldValue',
        headerStyle: { fontSize: '13px' }
      },
    ];

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
          dispatch( ruleSetActive( row ) );
        },
        onDoubleClick: (e, row, rowIndex) => {
          dispatch( uiOpenModalRule() );
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
          
        return rowIndex%2 === 0 ? { backgroundColor: '#d0d0d0', fontSize: '12px' } : { backgroundColor: 'white', fontSize: '12px' };
      };
      

      
    return (
      <BootstrapTable keyField='RuleFieldValue' data={ rules } columns={ columns } rowEvents={ rowEvents } selectRow={ selectRow } rowStyle={ rowStyle } />
    )
}
