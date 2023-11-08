import React, { useState, useEffect } from 'react';
import '../styles/CheckoutPage.css';
import { useAddressSelection } from '../context/AddressSelectionContext';
import { useCurrentOrder } from '../context/CurrentOrderContext';

function CheckoutPage({ onBackToCart }) {
    const { selectedAddress } = useAddressSelection();
    const { currentOrders } = useCurrentOrder();
    const [tipPercentage, setTipPercentage] = useState(null);
    const [customTip, setCustomTip] = useState(0);
    const [showCustomTipModal, setShowCustomTipModal] = useState(false); // State for the custom tip modal
    const [computedTip, setComputedTip] = useState(0);
    const [totalWithTip, setTotalWithTip] = useState(0);


    // Assuming you're buying from one store. Adjust if you support multi-store checkout.
    const selectedStoreId = Object.keys(currentOrders)[0];
    const cartItems = currentOrders[selectedStoreId];

    const subtotal = cartItems.reduce((acc, item) => acc + (item.totalCost || 0), 0);
    const deliveryFee = 1.99;
    const taxes = subtotal * 0.075;
    const serviceFee = (subtotal + taxes) * 0.029 + 0.30;
    const total = subtotal + deliveryFee + taxes + serviceFee;

    

    useEffect(() => {
        // Update computedTip whenever customTip changes
        // const formattedCustomTip = customTip / 100;
        // setComputedTip(formattedCustomTip);
        setComputedTip(parseInt(customTip));
    }, [customTip]);

    useEffect(() => {
        // Update totalWithTip whenever computedTip changes
        const newTotalWithTip = total + computedTip;
        setTotalWithTip(newTotalWithTip);
    }, [computedTip, total]);

    const handleTipSelection = (percentage) => {
        setTipPercentage(percentage);
        let calculatedTip = percentage / 100 * subtotal
        setComputedTip(calculatedTip)
        if (percentage === null) {
            setCustomTip(0);
        }
    };

    const handleCustomTipClick = () => {
        // Show the custom tip modal
        setShowCustomTipModal(true);
    };

    const handleCustomTipConfirmation = () => {
        // Close the custom tip modal
        setShowCustomTipModal(false);
    };

    const handleCustomTipChange = (value) => {
        console.log(value)
        setCustomTip(value)
    }

    return (
        <div className="checkout-page-overlay">
            <div className="container">
                <div className="modal-header">
                    <span className="back-button" onClick={onBackToCart}>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.41 16.09L10.83 11.5L15.41 6.91L14 5.5L8 11.5L14 17.5L15.41 16.09Z" fill="none" stroke="black" strokeWidth="2" />
                        </svg>


                    </span>
                    <h3 className="modal-label">Checkout</h3>
                </div>
                <div className="address-display">
                    Delivering to: {selectedAddress}
                </div>
                <div className="modal-content">
                    {cartItems.map((item, index) => (
                        <div className="checkout-item-wrapper" key={index}>
                            <div className="checkout-item">
                                <span className="item-name">{item.name}</span>
                                <span className="checkout-item-price">${item.totalCost.toFixed(2)}</span>
                            </div>
                            {item.customizations && Object.keys(item.customizations).length > 0 && (
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
                            )}
                        </div>
                    ))}
                </div>
                <div className="tip-section">
                    <h4>Would you like to leave a tip?</h4>
                    <div className="tip-buttons">
                        <button className="tip-button no-tip" onClick={() => handleTipSelection(0)}>No Tip</button>
                        <button className="tip-button" onClick={() => handleTipSelection(15)}>15%</button>
                        <button className="tip-button" onClick={() => handleTipSelection(20)}>20%</button>
                        <button className="tip-button" onClick={() => handleTipSelection(25)}>25%</button>
                        <button className="tip-button custom-tip" onClick={handleCustomTipClick}>Custom Tip</button>
                    </div>
                </div>

                 {/* Custom Tip Modal */}
                 {showCustomTipModal && (
                    <div className="custom-tip-modal">
                        <h4>Enter Custom Tip Amount</h4>
                        <input
                            type="number"
                            placeholder="Tip"
                            value={customTip > 0 ? customTip : ""}
                            onChange={(e) => handleCustomTipChange(e.target.value)}
                        />
                        <button onClick={handleCustomTipConfirmation}>Confirm</button>
                    </div>
                )}

                <div className="checkout-summary">
                    <div className="summary-item">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-item">
                        <span>Delivery Fee:</span>
                        <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="summary-item">
                        <span>Taxes (7.5%):</span>
                        <span>${taxes.toFixed(2)}</span>
                    </div>
                    <div className="summary-item">
                        <span>Service Fee:</span>
                        <span>${serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="summary-item">
                        <span>Tip:</span>
                        <span>${computedTip.toFixed(2)}</span>
                    </div>
                    <div className="summary-item total">
                        <span>Total:</span>
                        <span>${totalWithTip.toFixed(2)}</span>
                    </div>
                </div>
                <div className="stripe-info">
                    Payment securely processed by Stripe.
                </div>
                <div className="modal-footer">
                    <button className="pay-button">Pay</button>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;
