// StoreDetails.js

import React, { useState, useEffect } from 'react'; // import useEffect
import { useParams, Navigate } from 'react-router-dom'; // <-- import Navigate here
import { useSelectedStore } from '../context/SelectedStoreContext';
import Category from '../components/Category.js';
import MenuItem from '../components/MenuItem.js';
import MenuItemModal from '../components/MenuItemModal.js';
import '../styles/StoreDetails.css';
import { useCurrentOrder } from '../context/CurrentOrderContext';
import DoneButton from '../components/DoneButton';
import ViewCartModal from '../components/ViewCartModal';
import CheckoutPage from './CheckoutPage'; // import CheckoutPage component



function StoreDetails() {
    const { id } = useParams();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { currentOrders } = useCurrentOrder();
    const { selectedStore } = useSelectedStore();
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const uniqueCategories = [];
    const [showCartModal, setShowCartModal] = useState(false);
    const [showCheckoutPage, setShowCheckoutPage] = useState(false); // State to manage showing the CheckoutPage


    if (selectedStore && selectedStore.menu) {
        selectedStore.menu.forEach((item) => {
            if (!uniqueCategories.includes(item.category)) {
                uniqueCategories.push(item.category);
            }
        });
    }

    // useEffect hook to set the default selected category
    useEffect(() => {
        if (uniqueCategories.length > 0 && selectedCategory === null) {
            setSelectedCategory(uniqueCategories[0]);
        }
    }, [uniqueCategories, selectedCategory]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem(null);
    };

    const handleAddToOrder = (item) => {
        handleCloseModal();
    };

    const handleGoToCheckout = () => {
        setShowCartModal(false); // close cart modal
        setShowCheckoutPage(true); // show checkout page
    };

    const handleBackToCart = () => {
        setShowCheckoutPage(false); // hide checkout page
        setShowCartModal(true); // show cart modal again
    };

    if (!selectedStore) {
        return <Navigate to="/" />; // <-- Navigate to the root if no store is selected
    }

    return (
        <div className="store-details-container">
            <h1>{selectedStore ? selectedStore.name : 'Store Details'}</h1>
            <div className="category-list">
                {uniqueCategories.map((category) => (
                    <Category
                        key={category}
                        name={category}
                        isSelected={selectedCategory === category}
                        onClick={handleCategoryClick}
                    />
                ))}
            </div>
            <div className="menu-items-list">
                {selectedCategory && selectedStore && selectedStore.menu
                    ? selectedStore.menu
                        .filter((item) => item.category === selectedCategory)
                        .map((item) => (
                            <MenuItem
                                key={item.name}
                                name={item.name}
                                price={item.price}
                                onClick={() => handleItemClick(item)}
                            />
                        ))
                    : null}
            </div>
            {showModal && selectedItem && (
                <MenuItemModal
                    item={selectedItem}
                    onClose={handleCloseModal}
                    onAddToOrder={handleAddToOrder}
                />
            )}
            {showCartModal && (
                <ViewCartModal
                    onClose={() => setShowCartModal(false)}
                    onGoToCheckout={handleGoToCheckout}
                />
            )}

            {showCheckoutPage && <CheckoutPage onBackToCart={handleBackToCart} />}

            {!showCartModal && !showCheckoutPage && currentOrders[selectedStore?.id] && currentOrders[selectedStore?.id].length > 0 && (
                <div className="cart-button-container">
                    <DoneButton label="View Cart" onClick={() => setShowCartModal(true)} />
                </div>
            )}


        </div>
    );
}

export default StoreDetails;
