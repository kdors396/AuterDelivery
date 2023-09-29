import React from 'react';
import PropTypes from 'prop-types';
import '../styles/StoreFeed.css'

function StoreFeed({ storeImage, storeName }) {
  return (
    <div className="store-feed">
      <img src={storeImage} alt={storeName} className="store-image" />
      <h2 className="store-name">{storeName}</h2>
    </div>
  );
}

StoreFeed.propTypes = {
  storeImage: PropTypes.string.isRequired,
  storeName: PropTypes.string.isRequired,
};

export default StoreFeed;
