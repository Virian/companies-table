import React from 'react';
import PropTypes from 'prop-types';

import './TablePagination.css';
import IconButton from '../../IconButton';
import Select from '../../Select';

const TablePagination = ({
  total,
  page,
  pageSize,
  pageSizeOptions,
  onChangePage,
  onChangePageSize,
}) => (
  <div className="TablePagination">
    <span className="TablePaginationPageDetails">
      Rozmiar strony:
    </span>
    <Select
      className="TablePaginationSelect"
      value={pageSize}
      onChange={onChangePageSize}
    >
      {pageSizeOptions.map((option) => (
        <option key={`option-${option}`}>{option}</option>
      ))}
    </Select>
    <IconButton
      name="first_page"
      disabled={page === 0}
      onClick={() => onChangePage(0)}
    />
    <IconButton
      name="chevron_left"
      disabled={page === 0}
      onClick={() => onChangePage(page - 1)}
    />
    <span className="TablePaginationPageDetails">
      {`${page * pageSize + 1}-${(page + 1) * pageSize} of ${total}`}
    </span>
    <IconButton
      name="chevron_right"
      disabled={page === Math.floor(total / pageSize) - 1}
      onClick={() => onChangePage(page + 1)}
    />
    <IconButton
      name="last_page"
      disabled={page === Math.floor(total / pageSize) - 1}
      onClick={() => onChangePage(Math.floor(total / pageSize) - 1)}
    />
  </div>
);

TablePagination.propTypes = {
  total: PropTypes.number,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  onChangePage: PropTypes.func,
  onChangePageSize: PropTypes.func,
};

TablePagination.defaultProps = {
  total: 0,
  page: 0,
  pageSize: 10,
  pageSizeOptions: [10, 25, 50, 100],
  onChangePage: () => {},
  onChangePageSize: () => {},
};

export default TablePagination;
