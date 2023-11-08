import React from 'react';
import FoodDelivery from './containers/FoodDelivery';
import { AddressSelectionProvider } from './context/AddressSelectionContext';
import { SearchProvider } from './context/SearchContext'; // Import the SearchProvider
import { SelectedStoreProvider } from './context/SelectedStoreContext'; // Import the context
import { CartProvider } from './context/CartContext';
import { CurrentOrderProvider } from './context/CurrentOrderContext';


function App() {
  return (
    <div className="App">
      {/* Wrap your components with the context provider */}
      <AddressSelectionProvider>
        <SearchProvider>
          <SelectedStoreProvider>
            <CartProvider>
              <CurrentOrderProvider>
                <FoodDelivery />
              </CurrentOrderProvider>
            </CartProvider>
          </SelectedStoreProvider>
        </SearchProvider>
      </AddressSelectionProvider>
    </div>
  );
}

export default App;
