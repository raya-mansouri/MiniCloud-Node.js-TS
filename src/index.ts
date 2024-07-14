// server/src/index.ts
import express from 'express';
import Docker from 'dockerode';
import connectDB from './utils/db';
// import { createLogger } from './logger';

const app = express();
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

app.use(express.json());

// Routes for managing containers, volumes, and monitoring
import containerRoutes from './routes/containers';

app.use('/api/containers', containerRoutes);

connectDB().catch((error) => {
    if (error instanceof Error) {
      console.error('MongoDB connection error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});