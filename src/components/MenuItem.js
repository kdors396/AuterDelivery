// MenuItem.js
import React from 'react';
import '../styles/MenuItem.css'; // Import the CSS

function MenuItem({ name, price, onClick }) {
    return (
        <div className="menu-item" onClick={onClick}>
            <p className="item-name">{name}</p>
            <p className="item-price">${price}</p>
        </div>
    );
}

export default MenuItem;
