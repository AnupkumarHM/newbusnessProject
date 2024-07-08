import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './page/AuthPage';
import AdminPage from './page/AdminPage';
import NotFoundPage from './page/NotFoundPage';
import Home from './page/Home';
import { UserProvider } from './context/UserContext'; // Adjust the path as necessary

const AppRoutes = () => {
    return (
        <UserProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<AuthPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
        </UserProvider>
      );
    };

export default AppRoutes;
