import React, { useEffect, useState } from 'react';
import AddressSection from '../components/AddressSection';
import StoreFeed from '../components/StoreFeed';
import '../styles/DeliveryFeed.css';
import { useSearch } from '../context/SearchContext';
import mcdonalds from '../assets/mcdonalds.json';

const storeData = [mcdonalds]
function DeliveryFeed({ selectedAddress }) {
  const { searchInput } = useSearch();
  const [filteredStoreData, setFilteredStoreData] = useState([]);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    // Filter the storeData based on the searchInput
    const filteredData = storeData.filter((store) =>
      store.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    setFilteredStoreData(filteredData);

    // Apply the animation class to trigger the opacity transition
    setAnimationClass('updated');

    // Remove the animation class after the transition is complete
    const animationTimeout = setTimeout(() => {
      setAnimationClass('');
    }, 300); // Adjust the timeout duration as needed

    return () => {
      clearTimeout(animationTimeout);
    };
  }, [searchInput]);

  return (
    <div className="delivery-feed-container">
      <AddressSection address={selectedAddress} />
      <div className="delivery-feed-list-container">
        <div className={`store-feed-list ${animationClass}`}>
          {filteredStoreData.length === 0 ? (
            <p className="no-results-message">No results found.</p> // Styled message
          ) : (
            filteredStoreData.map((store) => (
              <StoreFeed key={store.id} store={store} />
            ))
          )}
        </div>
      </div>
      {/* Add your delivery information content here */}
    </div>
  );
}

export default DeliveryFeed;
