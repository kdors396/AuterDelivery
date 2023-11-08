import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/AddressChangeModal.css';
import location from '../images/location.png';
import IconInput from './IconInput';
import DoneButton from './DoneButton';
import { useAddressSelection } from '../context/AddressSelectionContext'; // Import the context hook

function AddressChangeModal({ isOpen, onClose }) {
  const [address, setAddress] = useState('');
  const { setAddress: setSelectedAddress } = useAddressSelection(); // Get the setAddress function from the context

  if (!isOpen) return null;

  const handleAddressChange = (inputValue) => {
    setAddress(inputValue);
  };

  const handleDoneClick = () => {
    setSelectedAddress(address); // Set the selectedAddress in the context
    onClose(); // Close the modal
  };

  return (
    <div className="address-change-modal-overlay">
      <div className="container">
        <div className="modal-header">
          <span className="close-button" onClick={onClose}>
            <svg
              width="36"
              height="36"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 5 L15 15 M15 5 L5 15"
                stroke="black"
                strokeWidth="2"
              />            </svg>
          </span>
          <h3 className="modal-label">Deliver to</h3>
        </div>
        <div className="modal-content">
          <div className="icon-input-wrapper">
            <IconInput
              icon={location}
              placeholder="Enter delivery address"
              value={address}
              onChange={handleAddressChange}
              backgroundColor="#f0f0f0"
            />
          </div>
          {/* Add other content as needed */}
        </div>
        <div className="modal-footer">
          <DoneButton onClick={handleDoneClick} />
        </div>
      </div>
    </div>
  );
}

AddressChangeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddressChangeModal;
