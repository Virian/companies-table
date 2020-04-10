import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import IconButton from '../IconButton';

describe('icon button', () => {
  it('renders without crashing', () => {
    expect.assertions(1);

    const { getByText } = render(<IconButton name="close" />);
    const icon = getByText('close');

    expect(icon).toBeInTheDocument();
  });

  it('does not fire on click function when button is disabled', () => {
    expect.assertions(2);

    const onClick = jest.fn();
    const { getByTestId } = render(
      <IconButton
        data-testid="icon"
        disabled
        name="close"
        onClick={onClick}
        onKeyPress={onClick}
      />,
    );
    const icon = getByTestId('icon');

    userEvent.click(icon);

    expect(icon).toBeDisabled();
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
