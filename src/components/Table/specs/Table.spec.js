import React from 'react';
import { render } from '@testing-library/react';

import Table from '../Table';

describe('table', () => {
  it('renders with given data', () => {
    expect.assertions(8);

    const data = [
      { key1: 'qwe', key2: 'ewq' },
      { key1: 'zxc', key2: 'cxz' },
      { key1: 'asd', key2: 'dsa' },
    ];
    const columns = [
      { label: 'First key', prop: 'key1', key: 'column1' },
      { label: 'Second key', prop: 'key2', key: 'column2' },
    ];

    const { getByText } = render(<Table data={data} columns={columns} />);
    const headCell1 = getByText('First key');
    const headCell2 = getByText('Second key');
    const cell1 = getByText('qwe');
    const cell2 = getByText('ewq');
    const cell3 = getByText('zxc');
    const cell4 = getByText('cxz');
    const cell5 = getByText('asd');
    const cell6 = getByText('dsa');

    expect(headCell1).toBeInTheDocument();
    expect(headCell2).toBeInTheDocument();
    expect(cell1).toBeInTheDocument();
    expect(cell2).toBeInTheDocument();
    expect(cell3).toBeInTheDocument();
    expect(cell4).toBeInTheDocument();
    expect(cell5).toBeInTheDocument();
    expect(cell6).toBeInTheDocument();
  });
});
