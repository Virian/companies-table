import React from 'react';
import { render } from '@testing-library/react';

import Loader from '../Loader';

describe('icon button', () => {
  it('renders without crashing', () => {
    expect.assertions(4);

    const { getByTestId } = render(
      <>
        <Loader data-testid="default"/>
        <Loader data-testid="small" size="small" />
        <Loader data-testid="medium" size="medium" />
        <Loader data-testid="large" size="large" />
      </>,
    );
    const defaultLoader = getByTestId('default');
    const smallLoader = getByTestId('small');
    const mediumLoader = getByTestId('medium');
    const largeLoader = getByTestId('large');

    expect(defaultLoader).toHaveClass('Loader-medium');
    expect(smallLoader).toHaveClass('Loader-small');
    expect(mediumLoader).toHaveClass('Loader-medium');
    expect(largeLoader).toHaveClass('Loader-large');
  });
});
