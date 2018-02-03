var express = require('express')
    cors = require('cors');
    

// server setup
var app = express();
var port = process.env.port || 3000;

// cors configuration
app.use(cors());

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