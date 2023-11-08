// Category.js

import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Category.css'; // Import your CSS file for category styling

function Category({ name, isSelected, onClick }) {
  return (
    <div
      className={`category-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(name)}
    >
      {name}
    </div>
  );
}

Category.propTypes = {
  name: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Category;
