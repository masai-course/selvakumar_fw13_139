import React from 'react';
import {Link} from 'react-router-dom'

const RoomsContainer = ({ rooms }) => {
  return (
    <div data-testid="rooms-container">
      {rooms.map(room => (
        <div key={room.id}>
          <h2>{room.name}</h2>
          <img src={room.image} alt={room.name} />
          <p>{room.description}</p>
          <button>
            <Link to={`/dashboard/${room.id}`}>View Details</Link>
          </button>
        </div>
      ))}
    </div>
  );
};

export default RoomsContainer;
