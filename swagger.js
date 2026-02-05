const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Toto Academy Backend API',
      version: '1.0.0',
      description: 'Educational Platform API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routers/*.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
