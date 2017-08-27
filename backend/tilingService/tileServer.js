var express = require('express');
    

// server setup
var app = express();
var port = process.env.port || 3000;

//bv fiddling on
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
//bv fiddling off

app.get('/api/tiles/:z/:x/:y', function (req, res) {

    console.log("Accessing tile:" + JSON.stringify(req.params));
    
    res.sendFile(__dirname +
                 '/sourcemap/'+ req.params.z +
                 '/' + req.params.x +
                 '/' + req.params.y + 
                 '.png');
  })

// console output
app.listen(port, function(){
    console.log('Running Tile Server API on port: ' + port);
});