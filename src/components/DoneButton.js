import React from 'react';
import PropTypes from 'prop-types';
import '../styles/DoneButton.css'

function DoneButton({ onClick }) {
  return (
    <button className="done-button" onClick={onClick}>
      Done
    </button>
  );
}

DoneButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DoneButton;
