// src/components/Login.js
import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '123456') {
      localStorage.setItem('user', JSON.stringify({ username }));
      history.push('/dashboard');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <Container>
      <h2 className="text-center my-4">Login</h2>
      <Form onSubmit={handleLogin}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" color="primary">Login</Button>
      </Form>
    </Container>
  );
};

export default Login;
