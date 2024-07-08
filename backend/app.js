const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('uploads'))
// Routes
app.use('/api/users', userRoutes);
app.use('/api/invoices', invoiceRoutes);


// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/newdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('MongoDB Connected');
  }).catch((err) => {
    console.error('MongoDB Connection Error: ', err);
  });

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
