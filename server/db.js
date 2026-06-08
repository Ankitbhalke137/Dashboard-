async function connectDB() {
  let mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    console.log('No MONGODB_URI set. Starting in-memory MongoDB...');
    const mongod = await MongoMemoryServer.create();
    mongoUri = mongod.getUri();
    console.log(`In-memory MongoDB running at: ${mongoUri}`);
  }

  return mongoUri;
}

module.exports = { connectDB };
