const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

app.use(cors());
//connect database
connectDB();

const app = express();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use('/', require('./controllers/index'));
app.use('/api/users', require('./controllers/users'));
app.use('/api/stalls', require('./controllers/stalls'));
app.use('/api/sections', require('./controllers/sections'));
