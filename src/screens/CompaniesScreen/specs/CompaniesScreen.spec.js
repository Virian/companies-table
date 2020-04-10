import React from 'react';
import { render } from '@testing-library/react';

import CompaniesScreen from '../CompaniesScreen';

describe('companies screen', () => {
  it('renders without crashing', () => {
    expect.assertions(0);

    render(<CompaniesScreen />);
  });
});
