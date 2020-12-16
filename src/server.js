/////////////MODULES///////////////////////

const express = require('express');

const bodyParser= require('body-parser');

var cors = require('cors');

require('dotenv').config();

let apiFilter = require("./api/api-filter");

//Documentation
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('../swagger.json');

const connectDB = require('./db/db-mongo.js');
//////////////////////////////////////////


// Initialize the app
let app = express();

connectDB();
// Setup server port
var port = process.env.PORT || 8080;

// use it before all route definitions
app.use(cors());

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
 }));

 app.use(bodyParser.json());


// Launch app to listen to specified port
// Import routes
//app.use(express.static('./dist/'));

/* app.use('*', (req, res, next) => {
     res.sendFile(path.join(__dirname, './dist/'));
 }); */



app.use('/url', apiFilter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', function (req, res) {
     res.json({
          status: 'Test Ok',
          message: 'Welcome to ApiFilter API, Documentation refer: https://url-filter.herokuapp.com/api-docs/'
      });
  });

app.listen(port, function () {
     console.log("App upload in port: " + port);
});