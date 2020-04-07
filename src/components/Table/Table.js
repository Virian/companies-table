import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Table.css';

const Table = ({ data, columns }) => {
  const formatCellContent = (value) => {
    if (!value) {
      return null;
    }
    if (Number.isNaN(value)) {
      return value;
    }
    return value.toLocaleString();
  };

  return (
    <div className="TableWrapper">
      <table className="Table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                className={classNames(
                  'TableCell',
                  'TableHeadCell',
                  `${column.align ? `TableCell-${column.align}` : ''}`,
                )}
                key={column.key}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </div>
  );
};

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
};

Table.defaultProps = {
  data: [],
  columns: [],
};

export default Table;
