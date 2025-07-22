const swaggerAutogen = require('swagger-autogen', 'swagger-ui-express')();

const doc = {
  info: {
    title: 'Library API',
    description: 'API for managing books and authors',
  },
  host: 'cse-341-project2-9u89.onrender.com/api-docs/',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);
