import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DeliveryAddress from './DeliveryAddress';
import DeliveryFeed from './DeliveryFeed';
import { useAddressSelection } from '../context/AddressSelectionContext';
import '../styles/FoodDelivery.css';

function FoodDelivery() {
    const { selectedAddress } = useAddressSelection();

    return (
        <Router>
            <div className={selectedAddress ? '' : 'food-delivery-container'}>
                <Routes>
                    <Route index element={selectedAddress ? <Navigate replace to="/feed" /> : <DeliveryAddress />} />
                    <Route path="/feed" element={selectedAddress ? <DeliveryFeed selectedAddress={selectedAddress} /> : <Navigate replace to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default FoodDelivery;
