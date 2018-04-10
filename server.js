const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

app.get('/api/v1/users', (request, response) => {
  database('users').select()
    .then(users => {
      response.status(200).json(users);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/users/:id', (request, response) => {
  const { id } = request.params;
  const users = database('users');

  users.where('id', id)
    .then( users => {
      response.status(200).json(users);
    })
    .catch(() => {
      response.status(404);
    });
});

app.get('/api/v1/users/:id/questions', (request, response) => {

});

app.post('/api/v1/users', (request, response) => {
  const userInfo = request.body;

  for (let requiredParameter of ['user_email', 'username', 'password', 'push_notifications_on', 'notification_time', 'primary_contact_name', 'primary_contact_email']) {
    if (!userInfo[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `You're missing a "${requiredParameter}" property.` });
    }
  }

  database('users').insert(userInfo, 'id')
    .then(user => {
      const { user_email, username, password, push_notifications_on, notification_time, primary_contact_name, primary_contact_email } = userInfo;
      response.status(201).json({ id: user[0], user_email, username, password, push_notifications_on, notification_time, primary_contact_name, primary_contact_email });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
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
