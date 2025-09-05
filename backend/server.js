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

// Register CORS
await fastify.register(cors, {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    /\.mgx\.dev$/,
    /\.vercel\.app$/
  ],
  credentials: true
});

// Register routes
await fastify.register(productRoutes, { prefix: '/api' });

// Health check endpoint
fastify.get('/health', async (request, reply) => {
  try {
    await sequelize.authenticate();
    return {
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    reply.status(500);
    return {
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
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
      languages: '/api/languages'
    }
  };
});

// Database connection and server startup
const start = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync models (this will create tables if they don't exist)
    // Note: This won't affect existing tables like Terms
    await sequelize.sync({ alter: false });
    console.log('Database models synchronized.');
    
    // Start server
    const port = process.env.PORT || 3001;
    const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
    
    await fastify.listen({ port, host });
    console.log(` Server running on http://${host}:${port}`);
    console.log(`API endpoints available at http://${host}:${port}/api/products`);
    console.log(`Language endpoints available at http://${host}:${port}/api/languages`);
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
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