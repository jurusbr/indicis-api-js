const express = require('express');
const app = express();
var cors = require('cors');
require('dotenv').config();

const logger = require("./src/util/logger");

logger.title("Iniciando API Node do Jurus");

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
 
app.use(cors());

const httpRouter = require("./src/router/httpRouter");

app.use(express.static(__dirname + "/public"));
app.use('/api',httpRouter);

app.all('/api', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });


const PORT = process.env.PORT || 9090;
const server = app.listen(PORT, () => {
  let host = server.address().address;
  const port = server.address().port;

  host = host==="::"?"localhost":host;

  logger.info(`Example app listening at http://${host}:${port}/api`);
});
