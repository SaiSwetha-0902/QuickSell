import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { FetchData } from '../data/FetchData'; 
import { Card, priorityIcons, statusIcons } from '../components/Card'; 
import '../css/Homepage.css'; 
import profilePlaceholder from '../images/profile-svgrepo-com.svg';
import addIcon from '../images/add.svg'; 
import threeDotsIcon from '../images/3 dot menu.svg'; 

const groupIcons = {
  'High Priority': priorityIcons[3],  
  'Medium Priority': priorityIcons[2],
  'Low Priority': priorityIcons[1],
  'Urgent Priority':priorityIcons[4],
  'No priority':priorityIcons[0],
  'Todo': statusIcons['Todo'],       
  'In Progress': statusIcons['In progress'],
  'Done': statusIcons['Done'],
  'Backlog': statusIcons['Backlog']
};


export function Homepage() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('userId'); 
  const [ordering, setOrdering] = useState('priority');  
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchData();
        setTickets(data.tickets || []);
        setUsers(data.users || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const applyFilter = () => {
      let data = [...tickets];
      if (ordering !== 'none') {
        data.sort((a, b) => {
          if (ordering === 'priority') return a.priority - b.priority;
          if (ordering === 'title') return a.title.localeCompare(b.title);
          return 0;
        });
      }
      if (grouping !== 'none') {
        data = data.reduce((acc, ticket) => {
          const key = ticket[grouping];
          (acc[key] = acc[key] || []).push(ticket);
          return acc;
        }, {});
      }
      setFilteredData(data);
    };

    if (grouping !== 'none' || ordering !== 'none') {
      applyFilter();
    } else {
      setFilteredData([]);
    }
  }, [grouping, ordering, tickets]);

  return (
    <div>
      <Navbar onGroupingChange={setGrouping} onOrderingChange={setOrdering} />
      <div className="cards-container">
      <div className="cards-container">
  {Object.keys(filteredData).length > 0 ? (
    Array.isArray(filteredData) ? (
      <div className="cards">
        {filteredData.map(ticket => (
          <Card key={ticket.id} ticket={ticket} user={users.find(user => user.id === ticket.userId) || { name: `User ${ticket.userId}`, available: true }} />
        ))}
      </div>
    ) : (
      <div className="group-section">
        {Object.keys(filteredData).map(groupKey => (
          <div key={groupKey} className="group">
            <div className="group-header">
              {grouping === 'user' ? (
                <img
                  src={profilePlaceholder}
                  alt="User Profile"
                  className="profile-img"
                  style={{ marginLeft: '10px' }}
                />
              ) : (
                <img src={groupIcons[groupKey] || '/path/to/default-icon.png'} alt="Group Specific Icon" className="group-icon" style={{ marginLeft: '20px' }} />
              )}
              <h3 style={{ marginLeft: '10px' }}>{groupKey}</h3>
              <img src={addIcon} alt="Add Icon" className="group-icon" style={{ marginLeft: '250px' }} />
              <img src={threeDotsIcon} alt="Three Dots Icon" className="group-icon" style={{ marginLeft: '20px' }} />
            </div>

            <div className="cards">
              {filteredData[groupKey].map(ticket => (
                <Card key={ticket.id} ticket={ticket} user={users.find(user => user.id === ticket.userId) || { name: `User ${ticket.userId}`, available: true }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  ) : null}
</div>

      </div>
    </div>
  );
}
