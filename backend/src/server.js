import { app } from './app.js';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';

const start = async () => {
  await connectDatabase();
  app.listen(env.port, () => {
    console.log(`🚀 API running on port ${env.port}`);
  });
};

start();
