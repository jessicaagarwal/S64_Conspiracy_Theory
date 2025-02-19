require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes');


const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api', routes);

app.get('/ping', (req, res) => {
    res.json({ message: 'Pong!' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
