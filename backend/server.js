// server.js
import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import sequelize from './db.js';
import Product from './models/Product.js';
import productRoutes from './routes/products.js';

dotenv.config();

const fastify = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'development' ? 'info' : 'warn'
  }
});

// --------------------
// CORS Setup
// --------------------
await fastify.register(cors, {
  origin: ['https://price-list-module.vercel.app'], // frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

// Handle OPTIONS preflight for all routes
fastify.options('*', async (request, reply) => {
  reply
    .header('Access-Control-Allow-Origin', 'https://price-list-module.vercel.app')
    .header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    .header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    .status(204)
    .send();
});

// --------------------
// Register routes
// --------------------
await fastify.register(productRoutes, { prefix: '/api' });

// Health check endpoint
fastify.get('/health', async (request, reply) => {
  try {
    await sequelize.authenticate();
    return {
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    reply.status(500);
    return {
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
});

// Root endpoint
fastify.get('/', async (request, reply) => {
  return {
    message: 'Price List API Server',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      products: '/api/products',
    },
  };
});

// --------------------
// Start server
// --------------------
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    await sequelize.sync({ alter: false });
    console.log('Database models synchronized.');

    const port = process.env.PORT || 3001;
    const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

    await fastify.listen({ port, host });
    console.log(`Server running on http://${host}:${port}`);
    console.log(`API endpoints available at http://${host}:${port}/api/products`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down server...');
  try {
    await sequelize.close();
    await fastify.close();
    console.log('Server shut down gracefully');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

start();
