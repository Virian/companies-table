import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TextField from '../TextField';

describe('text field', () => {
  it('renders with placeholder and value', () => {
    expect.assertions(3);

    const { getByPlaceholderText, getByTestId } = render(<TextField data-testid="field" value="test123" placeholder="my field" />);
    const field = getByTestId('field');
    const fieldByPlaceholder = getByPlaceholderText(/my field/i);

    expect(field).toBeInTheDocument();
    expect(field).toHaveValue('test123');
    expect(fieldByPlaceholder).toBeInTheDocument();
  });

  it('fires on change function', async () => {
    expect.assertions(2);

    const onChange = jest.fn();
    const { getByTestId } = render(<TextField data-testid="field" onChange={onChange} />);
    const field = getByTestId('field');

    await userEvent.type(field, 'hello');

    expect(field).toHaveValue('hello');
    expect(onChange).toHaveBeenCalledTimes(5);
  });
});
