import React from 'react';
import FoodDelivery from './containers/FoodDelivery';
import { AddressSelectionProvider } from './context/AddressSelectionContext';
import { SearchProvider } from './context/SearchContext'; // Import the SearchProvider


function App() {
  return (
    <div className="App">
      {/* Wrap your components with the context provider */}
      <AddressSelectionProvider>
        <SearchProvider>
          <FoodDelivery />
        </SearchProvider>
      </AddressSelectionProvider>
    </div>
  );
}

export default App;
