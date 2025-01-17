import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Table.scss';
import formatCellContent from './formatCellContent';
import Loader from '../Loader';

const Table = ({
  data,
  columns,
  isLoading,
  orderBy,
  orderDirection,
  onChangeOrder,
}) => (
  <div className="TableWrapper">
    <table className="Table">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              className={classNames(
                'TableCell',
                'TableHeadCell',
                `${column.align ? `TableCell-${column.align}` : ''}`,
              )}
              key={column.key}
            >
              <span
                className={classNames(
                  'TableHeadCellContent',
                  {
                    'TableHeadCellContent-active': orderBy === column.prop,
                  },
                )}
                role="button"
                tabIndex={index}
                onClick={() => onChangeOrder(column.prop)}
                onKeyPress={() => onChangeOrder(column.prop)}
              >
                {column.label}
                <i className="material-icons TableHeadCellContentIcon">
                  {orderDirection === 'desc' ? 'arrow_downward' : 'arrow_upward'}
                </i>
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td
              className="TableLoading"
              colSpan={columns.length}
            >
              <Loader size="medium" />
            </td>
          </tr>
        ) : (
          <>
            {data.map((row, index) => (
              <tr
                className="TableRow"
                key={`row-${index}`}
              >
                {columns.map((column) => (
                  <td
                  className={classNames(
                    'TableCell',
                    `${column.align ? `TableCell-${column.align}` : ''}`,
                  )}
                    key={`row-${index}-${column.key}`}
                  >
                    {formatCellContent(row[column.prop])}
                  </td>
                ))}
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  </div>
);

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    prop: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    align: PropTypes.oneOf([
      'left',
      'center',
      'right',
    ]),
  })),
  isLoading: PropTypes.bool,
  orderBy: PropTypes.string,
  orderDirection: PropTypes.oneOf(['asc', 'desc']),
  onChangeOrder: PropTypes.func,
};

Table.defaultProps = {
  data: [],
  columns: [],
  isLoading: false,
  orderBy: null,
  orderDirection: 'asc',
  onChangeOrder: () => {},
};

export default Table;
