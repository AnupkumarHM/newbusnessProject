import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/generate-invoice">Generate Invoice</Link></li>
            {/* Add more navigation links as needed */}
          </ul>
        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default Layout;
