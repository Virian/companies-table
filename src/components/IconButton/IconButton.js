import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './IconButton.css';

const IconButton = ({
  name,
  disabled,
  onClick,
  onKeyPress,
}) => (
  <button
    className={classNames('IconButton', { 'IconButton-disabled': disabled })}
    onClick={disabled ? null : onClick}
    onKeyPress={disabled ? null : onKeyPress}
  >
    <i className="material-icons IconButtonIcon">{name}</i>
  </button>
);

IconButton.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func,
};

IconButton.defaultProps = {
  disabled: false,
  onClick: () => {},
  onKeyPress: () => {},
};

export default IconButton;
