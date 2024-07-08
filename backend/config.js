module.exports = {
    mongoURI: 'mongodb://localhost:27017/your-database-name', // Replace with your actual MongoDB connection string
    port: process.env.PORT || 5000,
    jwtSecret: 'your_jwt_secret' // Replace with a long, randomly generated string for JWT secret
  };
  