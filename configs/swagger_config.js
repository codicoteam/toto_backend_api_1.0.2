const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const setupSwagger = (app) => {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Toto Academy Backend API',
        version: '1.0.2',
        description: 'Toto Academy Educational Platform API Documentation',
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
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          }
        }
      }
    },
    apis: ['./routers/*.js'], // Path to your router files
  };

  const specs = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    }
  }));
  
  console.log('í³˜ Swagger docs available at /api-docs');
};

module.exports = setupSwagger;
