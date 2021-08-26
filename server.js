const express = require('express');
require('dotenv').config()

const parse = require('./parse');
const sendCalendar = require('./sendCalendar');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// General route for parsing and saving an incoming schedule
app.post('/api', (req, res) => {

  const { id } = parse(req.body.schedule)

  res.send({ id });

});

// Request URL which receives the payload when the Slack bot is used
app.post('/slack/scheduler', (req, res) => {

  const payload = JSON.parse(req.body.payload);

  if (payload.type == 'message_action') {
    const { id, week } = parse(payload.message.text);
    sendCalendar(payload.response_url, id, week);
  }

  res.status(200).end();

});

// Retreives a specific schedule and presents it to the user
app.get('/get/:id', (req, res) => {

  res.sendFile(`${__dirname}/public/ics/${req.params.id}.ics`);

});

app.listen(process.env.PORT, () => { console.log(`Server running on port ${process.env.PORT}`) })
