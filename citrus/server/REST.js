var mysql = require('mysql');

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
  /*  router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    });
*/
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
                  for(let i of rows){
                    console.log(i.clue_lat);
                  }
            }
        });
    });
}
module.exports = REST_ROUTER;
