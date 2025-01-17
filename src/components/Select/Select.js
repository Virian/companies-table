import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Select.scss';

const Select = ({
  className,
  value,
  onChange,
  children,
  ...rest
}) => (
  <div className={classNames('SelectWrapper', className)}>
    <select
      value={value}
      className="Select"
      onChange={onChange}
      onBlur={onChange}
      {...rest}
    >
      {children}
    </select>
    <i className="material-icons SelectArrow">expand_more</i>
  </div>
);

Select.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  children: PropTypes.node,
};

Select.defaultProps = {
  className: null,
  value: undefined,
  onChange: () => {},
  children: null,
};

export default Select;
