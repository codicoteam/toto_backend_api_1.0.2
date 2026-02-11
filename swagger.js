const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Toto Academy Backend API',
      version: '1.0.2',
      description: 'Toto Academy Educational Platform API Documentation',
      contact: {
        name: 'Toto Academy Team',
        email: 'support@totoacademy.com'
      }
    },
    servers: [
      {
        url: 'https://toto-backend-api-1-0-2.onrender.com',
        description: 'Production server (Render)',
      },
      {
        url: 'http://localhost:3000',
        description: 'Development server (Local)',
      },
      {
        url: 'http://localhost:4071',
        description: 'Alternative local port',
      }
    ],
    tags: [
      { name: 'Admin', description: 'Administrator operations' },
      { name: 'Student', description: 'Student management' },
      { name: 'Teacher', description: 'Teacher operations' },
      { name: 'ContentSystem', description: 'Content system management' },
      { name: 'Topic', description: 'Topic management' },
      { name: 'Exam', description: 'Examination management' },
      { name: 'Community', description: 'Community features' },
      { name: 'Payment', description: 'Payment processing' },
      { name: 'Dashboard', description: 'Dashboard and analytics' },
      { name: 'Chat', description: 'Chat and messaging' },
      { name: 'Library', description: 'Library and books' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token in format: Bearer <token>'
        }
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Unauthorized access' }
                }
              }
            }
          }
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./routers/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);
module.exports = specs;
