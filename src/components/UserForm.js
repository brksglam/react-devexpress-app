// src/components/UserForm.js
import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const UserForm = ({ user, onSaveUser, onCancel }) => {
  const [formData, setFormData] = useState(user || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveUser(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="firstName">First Name</Label>
        <Input
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName || ''}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="lastName">Last Name</Label>
        <Input
          type="text"
          name="lastName"
          id="lastName"
          value={formData.lastName || ''}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          value={formData.email || ''}
          onChange={handleChange}
        />
      </FormGroup>
      <Button type="submit" color="primary">Save</Button>{' '}
      <Button type="button" color="secondary" onClick={onCancel}>Cancel</Button>
    </Form>
  );
};

export default UserForm;
