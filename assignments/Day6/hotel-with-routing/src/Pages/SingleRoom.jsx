import React from 'react';
import {Link} from 'react-router-dom'


const SingleRoom = () => {
  // Fetch room details based on URL params and display
  return (
    <div data-testid="room-info">
      {/* Room details */}
      <button>Book Now</button>
      <h3>Booking Successful <Link to="/dashboard">goto Dashboard</Link></h3>
    </div>
  );
};

export default SingleRoom;
