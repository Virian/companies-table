import React from 'react';
import { render } from '@testing-library/react';

import TablePagination from '../TablePagination';

describe('table pagination', () => {
  it('renders with given options', () => {
    expect.assertions(3);

    const { getByText } = render(<TablePagination pageSizeOptions={[13, 39, 117]} />);
    const option1 = getByText('13');
    const option2 = getByText('39');
    const option3 = getByText('117');

    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
    expect(option3).toBeInTheDocument();
  });
});
