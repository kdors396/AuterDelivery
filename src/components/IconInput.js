import React, { useState, useEffect } from 'react';
import AddressListItem from './AddressListItem';
import '../styles/IconInput.css';
import { useAddressSelection } from '../context/AddressSelectionContext';

const dummySuggestions = [
  { streetAddress: '123 Fake Street', cityState: 'Coral Springs, FL' },
  { streetAddress: '456 Elm Avenue', cityState: 'San Francisco, CA' },
  { streetAddress: '789 Oak Street', cityState: 'New York, NY' },
  { streetAddress: '101 Maple Lane', cityState: 'Los Angeles, CA' },
  { streetAddress: '555 Pine Road', cityState: 'Chicago, IL' },
];

function IconInput({ icon, placeholder, value, onChange, backgroundColor, dropdownEnabled = true, suggestionsProp }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const { selectedAddress, setAddress } = useAddressSelection();
  const [showClearText, setShowClearText] = useState(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length < 1) {
      setShowDropdown(false);
    } else {
      const filteredSuggestions = suggestionsProp.filter((suggestion) =>
        `${suggestion.streetAddress}, ${suggestion.cityState}`
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      );

      setSuggestions(filteredSuggestions);
      if (dropdownEnabled) {
        setShowDropdown(!!filteredSuggestions.length);
      }
    }

    onChange(inputValue);
    setShowClearText(!!inputValue);
  };

  const handleSuggestionClick = (suggestion) => {
    setAddress(`${suggestion.streetAddress}, ${suggestion.cityState}`);
    onChange(`${suggestion.streetAddress}, ${suggestion.cityState}`)
    setShowDropdown(false);
    setShowClearText(false);
  };

  const handleInputClick = () => {
    if (value && dropdownEnabled) {
      setShowDropdown(true);
    }
  };

  const handleClearClick = () => {
    onChange('');
    setShowClearText(false);
    setShowDropdown(false);
  };

  useEffect(() => {
    // Functionality to handle clicks outside of the component (if needed)
  }, []);

  return (
    <div className="icon-input"
    style={{ backgroundColor: backgroundColor }} // Apply the background color
    >
      <div className="input-icon">
        <img src={icon} alt="Icon" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onClick={handleInputClick}
        style={{ backgroundColor: backgroundColor }} // Apply the background color
      />
      {dropdownEnabled && showDropdown && (
        <ul className="autocomplete-dropdown">
          {suggestions.map((suggestion, index) => (
            <AddressListItem
              key={index}
              streetAddress={suggestion.streetAddress}
              cityState={suggestion.cityState}
              onClick={() => handleSuggestionClick(suggestion)}
            />
          ))}
        </ul>
      )}
      {showClearText && (
        <span className="clear-text" onClick={handleClearClick}>
          Clear
        </span>
      )}
    </div>
  );
}

export default IconInput;
