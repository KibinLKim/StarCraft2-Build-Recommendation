var http = require('http');
var fs = require('fs');
var express=require('express');
var app=express();

app.get('/', function(req,res){
  fs.readFile('index.html',function(err,data){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data);
  });
});

app.get('/imgs',function(req,res){
  fs.readFile('logoIMG.jpg',function(err,data){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data);
  });
});

app.listen(8080,function(){
  console.log('Server Start.');
})
/*
http.createServer(function (req, res) {
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(8080);
*/
