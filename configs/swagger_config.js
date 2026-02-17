const swaggerJsdoc = require('swagger-jsdoc');

const setupSwagger = (app) => {
  const swaggerUi = require('swagger-ui-express');
  
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
          url: process.env.RENDER_URL || 'https://toto-backend-api-1-0-2.onrender.com',
          description: 'Production server (Render)',
        },
        {
          url: `http://localhost:${process.env.PORT || 3000}`,
          description: 'Development server (Local)',
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
        }
      },
      security: [{
        bearerAuth: []
      }]
    },
    apis: ['./routers/*.js'],
  };

  const specs = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  console.log('í³˜ Swagger docs configured at /api-docs');
};

module.exports = setupSwagger;
