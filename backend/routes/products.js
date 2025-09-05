import Product from '../models/Product.js';
import { Op } from 'sequelize';

export default async function productRoutes(fastify, options) {
  // Get all products with optional search
  fastify.get('/products', async (request, reply) => {
    try {
      const { search_article, search_product, limit = 50, offset = 0 } = request.query;
      
      let whereClause = {};
      
      if (search_article) {
        whereClause.article_no = {
          [Op.iLike]: `%${search_article}%`
        };
      }
      
      if (search_product) {
        whereClause.product_service = {
          [Op.iLike]: `%${search_product}%`
        };
      }
      
      const products = await Product.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['created_at', 'DESC']]
      });
      
      return {
        success: true,
        data: products.rows,
        total: products.count,
        limit: parseInt(limit),
        offset: parseInt(offset)
      };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500);
      return {
        success: false,
        error: 'Failed to fetch products',
        message: error.message
      };
    }
  });

  // Get single product by ID
  fastify.get('/products/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      
      const product = await Product.findByPk(id);
      
      if (!product) {
        reply.status(404);
        return {
          success: false,
          error: 'Product not found'
        };
      }
      
      return {
        success: true,
        data: product
      };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500);
      return {
        success: false,
        error: 'Failed to fetch product',
        message: error.message
      };
    }
  });

  // Create new product
  fastify.post('/products', async (request, reply) => {
    try {
      const productData = request.body;
      
      const product = await Product.create(productData);
      
      reply.status(201);
      return {
        success: true,
        data: product,
        message: 'Product created successfully'
      };
    } catch (error) {
      fastify.log.error(error);
      
      if (error.name === 'SequelizeUniqueConstraintError') {
        reply.status(400);
        return {
          success: false,
          error: 'Article number already exists'
        };
      }
      
      if (error.name === 'SequelizeValidationError') {
        reply.status(400);
        return {
          success: false,
          error: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path,
            message: err.message
          }))
        };
      }
      
      reply.status(500);
      return {
        success: false,
        error: 'Failed to create product',
        message: error.message
      };
    }
  });

  // Update product
  fastify.put('/products/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const updateData = request.body;
      
      const product = await Product.findByPk(id);
      
      if (!product) {
        reply.status(404);
        return {
          success: false,
          error: 'Product not found'
        };
      }
      
      await product.update(updateData);
      
      return {
        success: true,
        data: product,
        message: 'Product updated successfully'
      };
    } catch (error) {
      fastify.log.error(error);
      
      if (error.name === 'SequelizeUniqueConstraintError') {
        reply.status(400);
        return {
          success: false,
          error: 'Article number already exists'
        };
      }
      
      if (error.name === 'SequelizeValidationError') {
        reply.status(400);
        return {
          success: false,
          error: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path,
            message: err.message
          }))
        };
      }
      
      reply.status(500);
      return {
        success: false,
        error: 'Failed to update product',
        message: error.message
      };
    }
  });

  // Delete product
  fastify.delete('/products/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      
      const product = await Product.findByPk(id);
      
      if (!product) {
        reply.status(404);
        return {
          success: false,
          error: 'Product not found'
        };
      }
      
      await product.destroy();
      
      return {
        success: true,
        message: 'Product deleted successfully'
      };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500);
      return {
        success: false,
        error: 'Failed to delete product',
        message: error.message
      };
    }
  });

  // Bulk update products
  fastify.patch('/products/bulk', async (request, reply) => {
    try {
      const { updates } = request.body; // Array of {id, ...updateData}
      
      if (!Array.isArray(updates)) {
        reply.status(400);
        return {
          success: false,
          error: 'Updates must be an array'
        };
      }
      
      const results = [];
      
      for (const update of updates) {
        const { id, ...updateData } = update;
        
        try {
          const product = await Product.findByPk(id);
          if (product) {
            await product.update(updateData);
            results.push({ id, success: true, data: product });
          } else {
            results.push({ id, success: false, error: 'Product not found' });
          }
        } catch (error) {
          results.push({ id, success: false, error: error.message });
        }
      }
      
      return {
        success: true,
        results,
        message: 'Bulk update completed'
      };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500);
      return {
        success: false,
        error: 'Failed to perform bulk update',
        message: error.message
      };
    }
  });
}