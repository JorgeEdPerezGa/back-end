const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

app.get('/api/v1/users', (request, response) => {

});

app.get('/api/v1/users/:id/questions', (request, response) => {

});

app.post('/api/v1/users', (request, response) => {

});

app.post('/api/v1/users/:id/questions', (request, response) => {

});

app.patch('/api/v1/users', (request, response) => {

});

app.listen(app.get('port'), () => {
  // eslint-disable-next-line
  console.log(`server running on port ${app.get('port')}`);
});

module.exports = app;
