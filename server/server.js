var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var rest = require("./REST.js");
var cors = require('cors');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
 });

function REST() {
  var self = this;
  self.connectMysql();
};

REST.prototype.connectMysql = function() {
  var self = this;
  // For testing on Localhost
  /*var pool = mysql.createPool({
      connectionLimit : 100,
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'citrus',
      debug    :  false
  });*/
  // For Heroku hosting
  var pool = mysql.createPool({
      connectionLimit : 100,
      host     : '173.212.229.171',
      user     : 'u3543633_test',
      password : 'qwerty1234567',
      database : 'u3543633_citrus',
      debug    :  true
  });
  pool.getConnection(function(err,connection) {
    if(err) {
      self.stop(err);
  } else {
      self.configureExpress(connection);
    }
  });
}

REST.prototype.configureExpress = function(connection) {
  var self = this;
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  var router = express.Router();
  app.use("/api", router);
  var rest_router = new rest(router,connection);
  app.use(cors());
  self.startServer();
}

REST.prototype.startServer = function() {
  app.listen(process.env.PORT || 3000,function() {
    console.log("Server started on port 3000...");
  });
}

REST.prototype.stop = function(err) {
  console.log("ISSUE WITH MYSQL n" + err);
  process.exit(1);
}

new REST();
