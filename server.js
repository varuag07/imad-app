var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').Pool;
var config = {
    user : 'varuag07',
    database : 'varuag07',
    host : 'http://db.imad.hasura-app.io',
    port : '5432',
    password : process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
/*app.get('/article-one', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});
app.get('/article-two', function (req, res) {
  res.send('Article 2 Page was requested.');
});
app.get('/article-three', function (req, res) {
  res.send('Article 3 Page was requested.');
});*/
app.get('/articles/:articleName', function (req, res) {
    var articleName = req.params.articleName;
    pool.query("SELECT * FROM ArticlesWebApp WHERE title='" + articleName +"'", function(err,result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            if(result.rows.length === 0)
            {
                res.status(404).send('Article Not Found.');
            }
            else
            {
                articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
    var articleData ;
  res.send(articleData);
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
var counter=0;
app.get('/counter', function(req,res){
    counter = counter + 1;
    res.send(counter.toString());
});
var names[];
app.get('/submit-name/:name',function(req,res){
    //Get the name from the request.
    var name = req.params.name;
    //
    names.push(name);
    
    res.send(JSON.stringify(names));
});
//Database Connection
var pool = new Pool(config);
app.get('/test-db',function(req,res){
    //Make a select Query
    pool.query('SELECT * FROM Test', function(err,results){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(JSON.stringify(result));
        }
    });
    //Return Results from db
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
