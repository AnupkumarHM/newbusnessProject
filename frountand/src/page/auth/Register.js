import React, { useState } from 'react';
import api from '../../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    image:''
  });
  const [file, setFile] = useState(null); // State for handling the file

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFile(e.target.files[0]); // Set the file state
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('firstName', formData.firstName);
      data.append('lastName', formData.lastName);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('phone', formData.phone);
      if (file) {
        data.append('image', file); // Append the file if it exists
      }
      const response = await api.registerUser(data);
      console.log('User registered:', response);
      // Optionally, redirect or show success message
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*" 
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
