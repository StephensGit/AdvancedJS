//  Bring in express
const express = require('express');

//  Bring in our DB connection
const connectDB = require('./config/db');

const path = require('path');

//  Initialise app variable with express
const app = express();

//  Connect Database
connectDB();

//  Initialise middleware, using this instead of bodyParser
app.use(express.json({ extended: false }));

//  Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/coffees', require('./routes/api/coffees'));

// Serve static assetts in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//  This will look for an  envrioment variable called port to use
//  locally it will run on 5000, so if there's now env port set this is the default
const PORT = process.env.PORT || 5000;

//  Take the app variable and listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
