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
            <svg
              width="26"
              height="26"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 7L8 11L12 7"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
