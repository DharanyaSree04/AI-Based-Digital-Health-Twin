const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

// Routes
const auth = require('./controllers/authController');
const log = require('./controllers/logController');
const chatController = require('./controllers/chatController');

app.post('/api/auth/register', auth.register);
app.post('/api/auth/login', auth.login);
app.get('/api/auth/admin/users', auth.getAllUsers);

app.post('/api/logs', log.createLog);
app.get('/api/logs/:userId', log.getLogs);

app.post('/api/chat', chatController.getChatResponse); 

app.listen(5000, () => console.log('Server running on 5000'));