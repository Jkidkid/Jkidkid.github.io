var mysql = require('mysql');

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {

  // Get player-info when connecting
  router.get("/users/:id",function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');
        var query = "SELECT ?? FROM ?? WHERE ??=?";
        var table = ["uid", "user","id",req.params.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
          if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json(rows);
        }
    });
  });

  // Get all the clues from db
  router.get("/clues",function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');
      var query = "SELECT * FROM ??";
      var table = ["clues"];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
        if(err) {
          res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
          res.json(rows);
      }
    });
  });


  // Test function to update db post
  router.get("/updateEmail/:id",function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    var query = `UPDATE ?? SET ?? = "ElinKviberg@example.se" WHERE ?? = ${req.params.id}`;
    var table = ["user", "email","id"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
          if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json(rows);
        }
    });
  });


}
module.exports = REST_ROUTER;
