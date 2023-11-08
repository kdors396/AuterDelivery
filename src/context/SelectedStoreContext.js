// SelectedStoreContext.js
import { createContext, useContext, useState, useCallback } from 'react';

const SelectedStoreContext = createContext();

export function useSelectedStore() {
  return useContext(SelectedStoreContext);
}

export function SelectedStoreProvider({ children }) {
  const [selectedStore, setSelectedStore] = useState(null);

  const selectStore = useCallback((store) => {
    setSelectedStore(store);
  }, []);

  const clearSelectedStore = useCallback(() => {
    setSelectedStore(null);
  }, []);

  return (
    <SelectedStoreContext.Provider value={{ selectedStore, selectStore, clearSelectedStore }}>
      {children}
    </SelectedStoreContext.Provider>
  );
}
