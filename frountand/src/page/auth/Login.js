import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext'; // Assuming you have a UserContext

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const { login } = useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.Logging( form);
      console.log(response)
      const { token, user } = response;
      console.log(user)
      localStorage.setItem('token', token);
      alert('Login successful');
      login(user);
      navigate('/home');
    } catch (error) {
      console.error(error);
      alert('Error logging in');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
