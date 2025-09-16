import express from 'express';

const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'PrintZplus Backend API'
  });
});

// API info route
router.get('/', (req, res) => {
  res.json({
    message: 'PrintZplus Backend API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      printJobs: '/api/print-jobs',
      blockchain: '/api/blockchain',
      users: '/api/users'
    }
  });
});

export default router;
