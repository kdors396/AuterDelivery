import { createContext, useContext, useState } from 'react';

// Create a context
const AddressSelectionContext = createContext();

// Create a custom hook to use the context
export function useAddressSelection() {
  return useContext(AddressSelectionContext);
}

// Create a context provider component
export function AddressSelectionProvider({ children }) {
  const [selectedAddress, setSelectedAddress] = useState('');

  const setAddress = (address) => {
    setSelectedAddress(address);
  };

  return (
    <AddressSelectionContext.Provider value={{ selectedAddress, setAddress }}>
      {children}
    </AddressSelectionContext.Provider>
  );
}
