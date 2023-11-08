import React from 'react';
import '../styles/ViewCartModal.css';
import DoneButton from './DoneButton';
import { useCurrentOrder } from '../context/CurrentOrderContext';
import { useSelectedStore } from '../context/SelectedStoreContext';

function ViewCartModal({ onClose, onGoToCheckout }) {
    const { currentOrders, updateQuantity, deleteFromOrder } = useCurrentOrder();
    const { selectedStore } = useSelectedStore();

    const cartItems = currentOrders[selectedStore.id];

    const subtotal = cartItems.reduce((acc, item) => acc + (item.totalCost || 0), 0);

    const handleQuantityChange = (itemIndex, increment) => {
        const newQuantity = cartItems[itemIndex].quantity + increment;
        updateQuantity(selectedStore.id, itemIndex, newQuantity);
    };

    const handleDelete = (itemIndex) => {
        deleteFromOrder(selectedStore.id, itemIndex);

        if (cartItems.length - 1 === 0) {
            onClose();
        }
    };

    return (
        <div className="view-cart-modal-overlay">
            <div className="container">
                <div className="modal-header">
                    <span className="close-button" onClick={onClose}>
                        <svg
                            width="26"
                            height="26"
                            viewBox="0 0 16 16"
                            fill="#000"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5 5 L15 15 M15 5 L5 15"
                                stroke="black"
                                strokeWidth="2"
                            />
                        </svg>
                    </span>
                    <h3 className="modal-label">{selectedStore.name} Cart</h3>
                </div>
                <div className="modal-content">
                    {cartItems.map((item, index) => (
                        <div className="cart-item-wrapper" key={index}>
                            <div className="cart-item">
                                <span className="item-name">{item.name}</span>
                                <span className="cart-item-price">${item.totalCost.toFixed(2)}</span>
                            </div>

                            {/* Display customizations */}
                            <div className="item-customizations">
                                <span className="customization-label">Customizations:</span>
                                {Object.values(item.customizations).flatMap(details =>
                                    Object.entries(details).map(([key, value]) => (
                                        <div key={key} className="customization-detail">
                                            {key} ({value})
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="bottom-controls">
                                <div className="quantity-control">
                                <button onClick={() => handleQuantityChange(index, -1)}  disabled={item.quantity <= 1}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                                </div>
                                <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
                            </div>
                        </div>
                    ))}



                </div>
                <div className="subtotal">
                    Subtotal: ${subtotal.toFixed(2)}
                </div>
                <div className="modal-footer">
                    <DoneButton onClick={onGoToCheckout} label="Go to checkout" />
                </div>
            </div>
        </div>
    );
}

export default ViewCartModal;
