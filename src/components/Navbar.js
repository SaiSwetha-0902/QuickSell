import React, { useState } from 'react';
import '../css/Navbar.css'; 

const Navbar = ({ onGroupingChange, onOrderingChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedGrouping, setSelectedGrouping] = useState('userId');
  const [selectedOrdering, setSelectedOrdering] = useState('priority');

  const handleGroupingChange = (e) => {
    const newGrouping = e.target.value;
    setSelectedGrouping(newGrouping);
    onGroupingChange(newGrouping);
    if (newGrouping !== 'none' && selectedOrdering !== 'none') {
      setIsDropdownOpen(false);
    }
  };

  const handleOrderingChange = (e) => {
    const newOrdering = e.target.value;
    setSelectedOrdering(newOrdering);
    onOrderingChange(newOrdering);
    if (selectedGrouping !== 'none' && newOrdering !== 'none') {
      setIsDropdownOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="dropdown">
          <button
            className="dropdown-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Display
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-header">Grouping</div>
              <div className="dropdown-item">
                <select onChange={handleGroupingChange} value={selectedGrouping}>
              
                  <option value="status">Status</option>
                  <option value="priority">Priority</option>
                  <option value="userId">User ID</option>
                </select>
              </div>
              <div className="dropdown-header">Ordering</div>
              <div className="dropdown-item">
                <select onChange={handleOrderingChange} value={selectedOrdering}>
           
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
