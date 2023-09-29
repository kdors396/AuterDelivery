import React, { useState } from 'react';
import AddressModal from './AddressModal';
import '../styles/AddressSection.css';
import IconInput from './IconInput';
import search from '../images/search.svg';
import { useSearch } from '../context/SearchContext'; // Import the useSearch hook

function AddressSection({ address }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { searchInput, setSearchInput } = useSearch(); // Use the useSearch hook

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSearchChange = (inputValue) => {
    setSearchInput(inputValue); // Update the search input state using the context
  };

  return (
    <div className="address-section">
      <div className="container">
        <div className="deliver-now">Deliver now</div>
        <a className="address" onClick={toggleModal}>
          {address}
          <span className="dropdown-icon">
            {/* Your SVG code here */}
          </span>
        </a>
        <div className="icon-input-container">
          <div className="icon-input-wrapper">
            <IconInput
              icon={search}
              placeholder="Search"
              value={searchInput}
              onChange={handleSearchChange}
              backgroundColor="#f0f0f0"
              dropdownEnabled={false}
            />
          </div>
        </div>
      </div>
      <AddressModal isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
}

export default AddressSection;
