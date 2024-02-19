import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Loader from '../Components/Loader';
import RoomsContainer from '../Components/RoomsContainer';

const Dashboard = () => {
  const { authState, logoutUser } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/rooms')
      .then(response => response.json())
      .then(data => {
        setRooms(data);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div>
      <h3>Dashboard</h3>
      <button data-testid="logout-btn" onClick={handleLogout}>Logout</button>
      <div data-testid="room-container">
        {loading ? <Loader /> : <RoomsContainer rooms={rooms} />}
      </div>
    </div>
  );
};

export default Dashboard;
