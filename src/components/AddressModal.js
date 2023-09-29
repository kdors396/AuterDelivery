import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/AddressModal.css';
import { useAddressSelection } from '../context/AddressSelectionContext';
import AddressChangeModal from './AddressChangeModal';
import DoneButton from './DoneButton'; // Import the DoneButton component

function AddressModal({ isOpen, onClose }) {
  const { selectedAddress } = useAddressSelection();
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);

  if (!isOpen) return null;

  const openChangeModal = () => {
    setIsChangeModalOpen(true);
  };

  const closeChangeModal = () => {
    setIsChangeModalOpen(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">Delivery details</h3>
        <div className="address-section-modal">
          <p className="selected-address">{selectedAddress}</p>
          <button className="edit-button" onClick={openChangeModal}>
            Change
          </button>
        </div>
        <DoneButton onClick={onClose} /> {/* Use the DoneButton component */}
      </div>

      {isChangeModalOpen && (
        <AddressChangeModal isOpen={isChangeModalOpen} onClose={closeChangeModal} />
      )}
    </div>
  );
}

AddressModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default AddressModal;
