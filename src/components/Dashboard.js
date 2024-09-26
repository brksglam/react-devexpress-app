// src/components/Dashboard.js
import React from 'react';
import { Container, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import UserList from './UserList';

const Dashboard = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <Container>
      <h2 className="text-center my-4">User and Order Management</h2>
      <Button color="danger" onClick={handleLogout}>Logout</Button>
      <UserList />
    </Container>
  );
};

export default Dashboard;
