import React from 'react';
import PropTypes from 'prop-types';
import '../styles/DoneButton.css';

function DoneButton({ onClick, label = "Done" }) {
  return (
    <button className="done-button" onClick={onClick}>
      {label}
    </button>
  );
}

DoneButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string // This prop is optional since it has a default value
};

export default DoneButton;
