import React from 'react';
import '../css/card.css';
import priorityurgent from '../images/SVG - Urgent Priority colour.svg';
import priorityHigh from '../images/Img - High Priority.svg';
import priorityMedium from '../images/Img - Medium Priority.svg';
import priorityLow from '../images/Img - Low Priority.svg';
import priorityno from '../images/No-priority.svg';

import statusTodo from '../images/To-do.svg';
import statusInProgress from '../images/in-progress.svg';
import statusdone from '../images/Done.svg';
import statusbacklog from '../images/Backlog.svg';
import profilePlaceholder from '../images/amina.webp'; 
export const priorityIcons = {
  4: priorityurgent,
  3: priorityHigh,
  2: priorityMedium,
  1: priorityLow,
  0: priorityno
};

export const statusIcons = {
  'Todo': statusTodo,
  'In progress': statusInProgress,
  'Done': statusdone,
  'Backlog': statusbacklog
};

export function Card({ ticket, user }) {
  const { id, title, tag, priority, status } = ticket;

 
  return (
    <div className="ticket-card">
      <header className="card-header">
        <div className="profile-container">
          <img
            src={profilePlaceholder}
            alt={user.name}
            className="profile-img"
          />
          {user.available && <span className="availability-indicator" />}
        </div>
        <div className="id">
          <span className="ticket-id">{id}</span>
        </div>
      </header>
      <div className="title-status">
  
  <div className="status-tag">
    <img src={statusIcons[status]} alt={`${status} icon`} />
  </div>
  <div className="title">
    <h3>{title}</h3>
  </div>
</div>

      <div className='priority-tag'>
        <div className='priority'>
          <img src={priorityIcons[priority]} alt={`${priority} icon`} />
        </div>
        {tag.map((t, index) => (
          <span key={index} className="tag">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
