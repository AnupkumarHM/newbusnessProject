import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useUser } from '../context/UserContext'; // Assuming you have a UserContext
import { Link,useNavigate } from 'react-router-dom'; // Import Link for navigation
import '../App.css';
const Home = () => {
    const [users, setUsers] = useState([]);
    const { user } = useUser(); // Using user state from UserContext
    const loggedInUserId = user ? user._id : null;
    const navigate = useNavigate(); // Get navigate function from react-router-dom

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log(localStorage)
                // if (!token) {
                //     console.error('No token found');
                //     return;
                // }

                const response = await api.fetchUsers();
                const filteredUsers = response.filter(user => user._id !== loggedInUserId);
                setUsers(filteredUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [loggedInUserId]);

    const cardStyles = {
        border: '1px solid #ccc',
        margin: '10px',
        padding: '10px',
        width: '200px',
        backgroundColor: 'linear-gradient(to right, #f9f9f9, #e9ecef)', // Example linear gradient from f9f9f9 to e9ecef
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      };
      
      const roundImage = {
        width: '100px',
        height: '100px',
        borderRadius: '50%', // Makes the image round
        objectFit: 'cover', // Ensures the image covers the entire space
    };
    const handleAdminButtonClick = () => {
        navigate(`/admin`); // Navigate to admin page with user ID
    };
    return (
        <div className="auth-page">
            <h1>All Users</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {users.map(user => (
                    <div key={user._id} style={cardStyles}>
                        <h2>{user.firstName} {user.lastName}</h2>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone}</p>
                        {user.image && <img src={user.image} alt={`${user.firstName}'s profile`} style={roundImage} />}

                    </div>
                ))}
                {/* {user.type === 'admin' ? (
                    <div style={{ marginTop: '10px' }}>
                    <button
                        onClick={handleAdminButtonClick}
                        style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Go to Admin Page
                    </button>
                </div>
                            // Admin specific content or nothing for admin users

                ) : (
                // Non-admin specific content
                <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
                    <div>No admin access</div>
                </div>
                        )} */}
            </div>
        </div>
    );
};

export default Home;
