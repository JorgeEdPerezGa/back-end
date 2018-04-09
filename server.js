const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

app.listen(app.get('port'), () => {
  // eslint-disable-next-line
  console.log(`server running on port ${app.get('port')}`);
});

module.exports = app;
