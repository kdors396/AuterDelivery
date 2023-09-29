import React from 'react';

function AddressListItem({ streetAddress, cityState, onClick }) {
  return (
    <li onClick={onClick}>
      <div className="address-list-item">
        <div className="street-address">{streetAddress}</div>
        <div className="city-state">{cityState}</div>
      </div>
    </li>
  );
}

export default AddressListItem;
