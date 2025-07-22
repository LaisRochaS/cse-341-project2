const swaggerAutogen = require('swagger-autogen', 'swagger-ui-express')();

const doc = {
  info: {
    title: 'Library API',
    description: 'API for managing books and authors',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js']; // entry point with all routes

swaggerAutogen(outputFile, endpointsFiles, doc);
