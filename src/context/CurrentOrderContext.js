import { createContext, useContext, useState, useCallback } from 'react';

const CurrentOrderContext = createContext();

export function useCurrentOrder() {
  return useContext(CurrentOrderContext);
}

export function CurrentOrderProvider({ children }) {
  const [currentOrders, setCurrentOrders] = useState({});

  const addToOrder = useCallback((storeId, item) => {
    setCurrentOrders(prev => ({
      ...prev,
      [storeId]: [...(prev[storeId] || []), item]
    }));
  }, []);

  const updateQuantity = useCallback((storeId, itemIndex, newQuantity) => {
    // Ensure quantity doesn't go below 1
    if (newQuantity < 1) newQuantity = 1;
  
    setCurrentOrders(prev => {
      // Get the current item
      const currentItem = prev[storeId][itemIndex];
  
      // Calculate the new total cost based on the item's base price and new quantity
      const newTotalCost = currentItem.totalCost / currentItem.quantity * newQuantity;
  
      // Update only the quantity and totalCost properties of the item
      const updatedItem = { ...currentItem, quantity: newQuantity, totalCost: newTotalCost };
  
      // Replace the item in the store's order list with the updated item
      const updatedStoreItems = [...prev[storeId]];
      updatedStoreItems[itemIndex] = updatedItem;
  
      return {
        ...prev,
        [storeId]: updatedStoreItems
      };
    });
  }, []);
  
  

  const deleteFromOrder = useCallback((storeId, itemIndex) => {
    setCurrentOrders(prev => {
      const updatedStoreItems = [...prev[storeId]];
      updatedStoreItems.splice(itemIndex, 1);
  
      if (updatedStoreItems.length === 0) {
        const updatedOrders = { ...prev };
        delete updatedOrders[storeId];
        return updatedOrders;
      } else {
        return {
          ...prev,
          [storeId]: updatedStoreItems
        };
      }
    });
  }, []);
  
  

  return (
    <CurrentOrderContext.Provider value={{ currentOrders, addToOrder, updateQuantity, deleteFromOrder }}>
      {children}
    </CurrentOrderContext.Provider>
  );
}
