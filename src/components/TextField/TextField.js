import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TextField.scss';

const TextField = ({
  className,
  placeholder,
  value,
  onChange,
  ...rest
}) => (
  <input
    className={classNames('TextField', className)}
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    {...rest}
  />
);

TextField.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

TextField.defaultProps = {
  className: null,
  placeholder: null,
  value: undefined,
  onChange: () => {},
};

export default TextField;
