require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { MongoMemoryServer } = require('mongodb-memory-server');

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const facultyRoutes = require('./routes/faculty');
const eventRoutes = require('./routes/events');
const governanceRoutes = require('./routes/governance');
const clubRoutes = require('./routes/clubs');
const titleRoutes = require('./routes/titles');
const messageRoutes = require('./routes/messages');
const leaderboardRoutes = require('./routes/leaderboard');
const bookRoutes = require('./routes/books');
const suggestionRoutes = require('./routes/suggestions');
const setupChatHandler = require('./socket/chatHandler');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/governance', governanceRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/titles', titleRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/suggestions', suggestionRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

setupChatHandler(io);

const PORT = process.env.PORT || 5000;

async function start() {
  let mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.log('No MONGODB_URI set. Starting in-memory MongoDB...');
    const mongod = await MongoMemoryServer.create();
    mongoUri = mongod.getUri();
    console.log(`In-memory MongoDB running at: ${mongoUri}`);
  }

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');

  const isInMemory = !process.env.MONGODB_URI;
  if (isInMemory) {
    console.log('Seeding in-memory database...');
    const seed = require('./seed');
    await seed();
  }

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Client should connect to http://localhost:5173`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

module.exports = { app, server, io };
