import React, { useState } from 'react';
import IconInput from '../components/IconInput';
import BasicButton from '../components/BasicButton';
import '../styles/DeliveryAddress.css';
import location from '../images/location.png';

function DeliveryAddress() {
  const [address, setAddress] = useState('');

  const handleAddressChange = (inputValue) => {
    setAddress(inputValue);
  };

  const handleSubmit = () => {
    console.log('Address submitted:', address);
  };

  const dummySuggestions = [
    { streetAddress: '123 Fake Street', cityState: 'Coral Springs, FL' },
    { streetAddress: '456 Elm Avenue', cityState: 'San Francisco, CA' },
    { streetAddress: '789 Oak Street', cityState: 'New York, NY' },
    { streetAddress: '101 Maple Lane', cityState: 'Los Angeles, CA' },
    { streetAddress: '555 Pine Road', cityState: 'Chicago, IL' },
  ];

  return (
    <div className="delivery-address-container">
      <div className="delivery-address-content">
        <h2 className="delivery-address-heading">Order food to your door</h2>
        <div className="input-button-container">
          <div className="icon-input-wrapper">
            <IconInput
              icon={location}
              placeholder="Enter delivery address"
              value={address}
              onChange={handleAddressChange}
              suggestionsProp={dummySuggestions}
            />
          </div>
          <BasicButton label="Get started" onClick={handleSubmit} color="black" />
        </div>
      </div>
    </div>
  );
}

export default DeliveryAddress;
