import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/MenuItemModal.css';
import DoneButton from './DoneButton';
import { useCurrentOrder } from '../context/CurrentOrderContext';
import { useSelectedStore } from '../context/SelectedStoreContext';

function MenuItemModal({ item, onClose, onAddToOrder }) {
  const { selectedStore } = useSelectedStore();
  const { addToOrder } = useCurrentOrder();
  const [quantity, setQuantity] = useState(1);
  const [customizations, setCustomizations] = useState({});
  const [totalCost, setTotalCost] = useState(item.price); // Initialize with base price

  useEffect(() => {
    let additionalCost = 0;
    for (let section in customizations) {
      for (let optionName in customizations[section]) {
        const selectedOption = item.customizations[0][section].options[optionName].find(
          o => o.option === customizations[section][optionName]
        );
        additionalCost += selectedOption ? selectedOption.price : 0;
      }
    }
    setTotalCost((item.price + additionalCost) * quantity); // Multiply by quantity here
    console.log("Total Cost:", totalCost.toFixed(2));
  }, [customizations, item, quantity]);

  const handleAddQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleSubtractQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleAddToOrderClick = () => {
    addToOrder(selectedStore.id, {
      ...item,
      customizations,
      totalCost,
      quantity
    });
    onClose();
  };

  const handleCustomizationChange = (section, optionName, value) => {
    setCustomizations((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [optionName]: value
      }
    }));
  };

  if (!item) return null;

  return (
    <div className="menu-item-modal-overlay">
      <div className="container">
        <div className="modal-header">
          <span className="close-button" onClick={onClose}>
            <svg
              width="26"
              height="26"
              viewBox="0 0 16 16"
              fill="#000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 5 L15 15 M15 5 L5 15"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          </span>
          <h3 className="modal-label">{item.name} - ${totalCost.toFixed(2)}</h3>
        </div>
        <div className="modal-content">
          {item.customizations &&
            item.customizations.map((customizationSection, index) => {
              return Object.keys(customizationSection).map((sectionName) => {
                const uniqueKeyForDropdown = `${index}-${sectionName}`;
                const section = customizationSection[sectionName];
                if (section.type === 'dropdown') {
                  return (
                    <div key={uniqueKeyForDropdown} className="customization-dropdown">
                      <h4>{sectionName}</h4>
                      {Object.keys(section.options).map((optionName) => (
                        <div key={optionName} className="option">
                          <label>
                            {optionName}
                            {section.options[optionName].map((o) => (
                              <div key={o.option} className="custom-option">
                                <input
                                  type="radio"
                                  name={optionName}
                                  value={o.option}
                                  defaultChecked={o.default}
                                  onChange={() =>
                                    handleCustomizationChange(
                                      sectionName,
                                      optionName,
                                      o.option
                                    )
                                  }
                                />
                                {o.option} {o.price > 0 ? `(+${o.price.toFixed(2)})` : ''}
                              </div>
                            ))}
                          </label>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              });
            })}
          <div className="quantity-control">
            <button onClick={handleSubtractQuantity}>-</button>
            <span>{quantity}</span>
            <button onClick={handleAddQuantity}>+</button>
          </div>
        </div>
        <div className="modal-footer">
          <DoneButton onClick={handleAddToOrderClick} label="Add to order" />
        </div>
      </div>
    </div>
  );
}

MenuItemModal.propTypes = {
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddToOrder: PropTypes.func.isRequired,
};

export default MenuItemModal;
