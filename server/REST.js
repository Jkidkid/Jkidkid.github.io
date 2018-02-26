var mysql = require('mysql');

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {

  // Get player-info when connecting
  router.get("/users/:id",function(req,res){
    var query = "SELECT * FROM ?? WHERE ??=?";
    var table = ["user","id",req.params.id];
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

  // fetch all available clues for the team
  router.get("/availableClues/:team_id",function(req,res){
    var query = "SELECT * FROM ?? WHERE ??=?";
    var table = ["team_clues","team_id", req.params.team_id];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
    } else {
        res.json(rows);
      }
    });
  });

  router.post("/newTeamClue/:id/:clue_id",function(req,res){
    var query = "INSERT INTO ??(??,??) VALUES (?,?)";
    var table = ["team_clues","clue_id", "team_id", req.params.clue_id,req.params.id];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json({"Error" : false, "Message" : "User Added !"});
        }
    });
});

  // fetch the teams timer_ends_at
  router.get("/timerTime/:team_id",function(req,res){
    var query = "SELECT timer_ends_at FROM ?? WHERE ??=?";
    var table = ["groups","groupID", req.params.team_id];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
    } else {
        res.json(rows);
      }
    });
  });


  router.put("/updateDbTimer/:team_id/:time",function(req,res){
    var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    var table = ["groups","timer_ends_at", req.params.time, "groupID",req.params.team_id];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json({"Error" : false, "Message" : "Updated the DB timer_ends_at to " + req.params.time});
        }
    });
});
}

module.exports = REST_ROUTER;
