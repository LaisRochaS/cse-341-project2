const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {     
        title: 'Applicants API',
        description: 'API for managing applicants and jobs',
    },
    host: 'localhost:3000',
    schemes: [ 'https']
}
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/applicantRoutes.js', './routes/jobRoutes.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);