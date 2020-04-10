import React from 'react';
import PropTypes from 'prop-types';

import './TablePagination.scss';
import IconButton from '../../IconButton';
import Select from '../../Select';

const TablePagination = ({
  total,
  page,
  pageSize,
  pageSizeOptions,
  onChangePage,
  onChangePageSize,
}) => {
  const lastVisibleElement = (page + 1) * pageSize > total ? total : (page + 1) * pageSize;

  const isNextPageDisabled = (page + 1) * pageSize >= total;

  return (
    <div className="TablePagination">
      <div className="TablePaginationPageSize">
        <span className="TablePaginationPageDetails">
          Page size:
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
      </div>
      <div className="TablePaginationPageButtons">
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
          {`${page * pageSize + 1}-${lastVisibleElement} of ${total}`}
        </span>
        <IconButton
          name="chevron_right"
          disabled={isNextPageDisabled}
          onClick={() => onChangePage(page + 1)}
        />
        <IconButton
          name="last_page"
          disabled={isNextPageDisabled}
          onClick={() => onChangePage(Math.floor(total / pageSize) - 1)}
        />
      </div>
    </div>
  );
};

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
