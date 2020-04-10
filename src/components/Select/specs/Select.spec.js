import React from 'react';
import { render } from '@testing-library/react';

import Select from '../Select';

describe('select', () => {
  it('renders with value', () => {
    expect.assertions(3);

    const { getByTestId } = render(
      <Select data-testid="field" value="2">
        <option value="1">first</option>
        <option value="2">second</option>
      </Select>,
    );
    const field = getByTestId('field');

    expect(field).toBeInTheDocument();
    expect(field).toHaveValue('2');
    expect(field).toHaveDisplayValue('second');
  });
});
