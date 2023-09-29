import React from 'react';
import PropTypes from 'prop-types';
import '../styles/BasicButton.css';

function BasicButton({ label, onClick, color }) {
  const buttonStyle = {
    backgroundColor: color || 'blue', // Default to 'blue' if color is not provided
    color: 'white', // You can adjust text color based on the background color
    padding: '8px', // Add padding to match the IconInput
    height: '46px', // Set the button height to 46px
    minWidth: '60px', // Set the minimum width to 60px
    fontSize: '1.1rem', // Adjust the font size (e.g., slightly bigger)
    fontWeight: '600', // Slightly less thick font weight
  };

  return (
    <button onClick={onClick} style={buttonStyle}>
      {label}
    </button>
  );
}

BasicButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string, // Add color as a prop
};

export default BasicButton;
