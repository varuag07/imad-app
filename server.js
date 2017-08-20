var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var Pool = require('pg').Pool;
var config = {
    user : 'varuag07',
    database : 'varuag07',
    host : 'db.imad.hasura-app.io',
    port : '5432',
    password : process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/hash/:input', function (req,res) {
    var hashedString = hash(req.params.input, 'this-is-a-random-string');
    res.send(hashedString);
});

function hash(input,salt)
{
    //Create a Hash.
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ['pbkdf2' , '10000', salt , hashed.toString('hex')].join('$');
}

//Register a new user
app.post('/create-user', function(req,res){
    
    var username = req.body.username;
    var password = req.body.password;
    
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query('INSERT INTO "UserLogin" ("UserName", "Password") VALUES ($1,$2)', [username, dbString], function (err, result){
        
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send('User Successfully Created: ' + username);    
        }
    });
});

//Login a user
app.post('/login', function(req,res){
    
    var username = req.body.username;
    var password = req.body.password;
    
    pool.query('SELECT * FROM \'UserLogin\' WHERE "UserName"=$1', [username], function (err, result){
        
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            if(result.rows.length === 0)
            {
                res.status(403).send("UserName/Password not is Invalid.");
            }
            else
            {
                //Match the password
                var dbString = result.rows[0].password;
                console.log("Password = " + dbString);
                var salt = dbString.split('$')[2];
                var hashedPassword = hash(password,salt);
                if(hashedPassword === dbString)
                {
                    res.send('Login Successful');    
                }else
                {
                    res.send('Incorrect Password');
                }
            }
        }
    });
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
var names=[];
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
            res.send(JSON.stringify(results));
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
