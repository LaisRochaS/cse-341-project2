const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {     
        title: 'Contacts API',
        description: 'API for managing contacts'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
}
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/applicantRoutes.js', './routes/jobRoutes.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);