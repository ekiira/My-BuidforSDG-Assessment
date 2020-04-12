const express = require('express');

const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

// const { check, validationResult } = require('express-validator');
const convert = require('xml2js');
const covid19ImpactEstimator = require('../estimator');


app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the server-side for the Covid-19 impact-estimator');
});

app.post('/api/v1/on-covid-19', (req, res) => {
  const datum = req.body;
  const receive = (covid19ImpactEstimator(datum));
  res.set('Cache-Control', 'max-age=31557600');
  res.send(receive);
});

app.post('/api/v1/on-covid-19/json', (req, res) => {
  const datum = req.body;
  res.set('Cache-Control', 'max-age=31557600');
  res.send(covid19ImpactEstimator(datum));
});

app.post('/api/v1/on-covid-19/xml', (req, res) => {
  const datum = req.body;
  res.type('application/xml');
  const builder = new convert.Builder();
  const xml = builder.buildObject(covid19ImpactEstimator(datum));
  res.set('Cache-Control', 'max-age=31557600');
  res.send(xml);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  process.stdout.write(`server is running at port ${port}`);
});
