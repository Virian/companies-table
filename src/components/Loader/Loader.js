import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Loader.scss';

const Loader = ({ size, ...rest }) => (
  <div className={classNames('Loader', `Loader-${size}`)} {...rest} />
);

Loader.propTypes = {
  size: PropTypes.oneOf([
    'small',
    'medium',
    'large',
  ]),
};

Loader.defaultProps = {
  size: 'medium',
};

export default Loader;
