import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelectedStore } from '../context/SelectedStoreContext'; // Import the context
import '../styles/StoreFeed.css';

function StoreFeed({ store }) {
  const navigate = useNavigate();
  const { selectStore } = useSelectedStore(); // Access the selectStore function from the context

  const handleOnClick = (destination) => {
    selectStore(store); // Set the selected store
    navigate(destination);
  }

  return (
    <div className="store-feed" onClick={() => handleOnClick(`/store/${store.id}`)}>
      <img src={require('../images/store1.jpg')} alt={store.name} className="store-image" />
      <h2 className="store-name">{store.name}</h2>
    </div>
  );
}

StoreFeed.propTypes = {
  store: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    // Add other store details as needed
  }).isRequired,
};

export default StoreFeed;
