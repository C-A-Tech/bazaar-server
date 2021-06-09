const express = require('express');
const connectDB = require('./config/db');

//connect database
connectDB();

const app = express();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use('/api', require('./controllers/index'));
app.use('/api/users', require('./controllers/users'));
