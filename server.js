const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('express-cors');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

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

app.get('/api/v1/users/:id/daily_totals', (request, response) => {
  const { id } = request.params;
  const questions = database('daily_totals');

  questions.where('user_id', id).select()
    .then( totals => {
      response.status(200).json(totals);
    })
    .catch( error => {
      throw error;
    });
});

app.post('/api/v1/users', (request, response) => {
  const userInfo = request.body;

  for (let requiredParameter of ['token_string']) {
    if (!userInfo[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `You're missing a "${requiredParameter}" property.` });
    }
  }

  database('users').insert(userInfo, 'id')
    .then(user => {
      const { token_string } = userInfo;
      response.status(201).json({ id: user[0], token_string });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/users/:id/daily_totals', (request, response) => {
  const user_id = request.params.id;
  const dailyTotalsInfo = request.body;

  for (let requiredParameter of ['current_date', 'week_start_date', 'daily_total']) {
    if (!dailyTotalsInfo[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `You're missing a "${requiredParameter}" property.` });
    }
  }

  database('daily_totals').insert(dailyTotalsInfo, 'id', user_id)
    .then( question => {
      const { current_date, week_start_date, daily_total  } = dailyTotalsInfo;
      response.status(201).json({ id: question[0], user_id, current_date, week_start_date, daily_total });
    })
    .catch(error => {
      response.status(404).json({ error });
    });
});

app.listen(app.get('port'), () => {
  // eslint-disable-next-line
  console.log(`server running on port ${app.get('port')}`);
});

module.exports = app;
