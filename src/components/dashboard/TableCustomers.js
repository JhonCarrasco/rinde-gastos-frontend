import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';




import { companyLoaded } from '../../actions/company';
import { customerSetActive } from '../../actions/customers';
import { uiOpenModal } from '../../actions/ui';
import paginationFactory from 'react-bootstrap-table2-paginator';



export const TableCustomers = ({ customers }) => {

  const { activeCustomer } = useSelector(state => state.customer);
  const dispatch = useDispatch();

  // Events
  const columns = [{
    dataField: 'Rut',
    text: 'Rut',

  }, {
    dataField: 'CustomerName',
    text: 'Cliente',

  }, {
    dataField: 'Email',
    text: 'Email',

  }];

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      dispatch(customerSetActive(row));
    },
    onDoubleClick: (e, row, rowIndex) => {
      dispatch(uiOpenModal());
      dispatch(companyLoaded(activeCustomer.Companies));
    },

  };

  const selectRow = {
    mode: 'radio',
    clickToSelect: true,
    hideSelectColumn: true,
    bgColor: '#33FCFF',
    selectionRenderer: ({ mode, ...rest }) => (
      <input type={mode} {...rest} />
    )
  };

  const rowStyle = (row, rowIndex) => {

    return rowIndex % 2 === 0 ? { backgroundColor: '#d0d0d0' } : { backgroundColor: 'white' };
  };

  // Pagination
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Muestra {from} de {to} de {size} Resultados
    </span>
  );

  const sizePerPageRenderer = ({
    options,
    currSizePerPage,
    onSizePerPageChange
  }) => (
    <div className="btn-group" role="group">
      {
        options.map((option) => {
          const isSelect = currSizePerPage === `${option.page}`;
          return (
            <button
              key={option.text}
              type="button"
              onClick={() => onSizePerPageChange(option.page)}
              className={`btn ${isSelect ? 'btn-secondary' : 'btn-warning'}`}
            >
              {option.text}
            </button>
          );
        })
      }
    </div>
  );

  const sizePerPageOptionRenderer = ({
    text,
    page,
    onSizePerPageChange
  }) => (
    <li
      key={text}
      role="presentation"
      className="dropdown-item"
    >
      <a
        tabIndex="-1"
        role="menuitem"
        data-page={page}
        onMouseDown={(e) => {
          e.preventDefault();
          onSizePerPageChange(page);
        }}
        style={{ color: 'red' }}
      >
        {text}
      </a>
    </li>
  );

  const options = {
    showTotal: true,
    sizePerPageOptionRenderer,
    paginationTotalRenderer: customTotal,
    // disablePageTitle: true,
    sizePerPageRenderer
  };

  // Search
  const MySearch = (props) => {
    let input;
    const handleOnChange = () => {
      props.onSearch(input.value);
    };
    const handleClick = () => {
      props.onClear();
      input.value = '';
    };
    return (
      <div className="d-flex">
        <input
            className="form-control col-3 ml-auto"
            // style={ { backgroundColor: 'pink' } }
            ref={ n => input = n }
            type="text"
            onChange={ handleOnChange }
            placeholder="Buscar"
          />
        <button className="btn btn-secondary ml-1" onClick={ handleClick }>Limpiar Busqueda</button>
    </div>
    );
  };


  return (

    <div className="container">
      <ToolkitProvider
      keyField="Id"
      data={customers}
      columns={columns}
      search
    >
      {
        props => (
          <div>
            <h3>Clientes:</h3>
            <MySearch { ...props.searchProps } />
            <hr />
            <BootstrapTable
              rowEvents={rowEvents}
              selectRow={selectRow}
              rowStyle={rowStyle}
              pagination={paginationFactory(options)}
              {...props.baseProps}
            />
          </div>
        )
      }
    </ToolkitProvider>
    </div>

  )
}
