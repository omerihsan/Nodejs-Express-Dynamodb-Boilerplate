const express = require('express');
const bodyParser = require('body-parser');
const router = require('express-routes-mapper');
const dynamoose = require('dynamoose');
const config = require('./config/');

dynamoose.aws.sdk.config.update({
    accessKeyId: 'Your key',
    secretAccessKey: 'Your Secret',
    region: 'some region'
  });

const app = express();

const mappedRoutes = router(config.apiRoutes, 'app/controllers/');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', mappedRoutes);

module.exports = app;