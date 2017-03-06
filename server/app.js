var express = require('express'),
	app 	= express(),
	path	= require('path'),
	bodyParser = require('body-parser'),
	server	= require('http').createServer(app);

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');



var users = [{username: 'admin', password: '1234'}];


app.get('/', function(req, res){
	res.render('signup')
});


app.get('/login', function(req, res){
	res.render('login')
});

app.get('/home', function(req, res){
	res.render('home', {})
});


app.post('/signup', function(req, res){
	var user = {username: req.body.username, password: req.body.password};
	users.push(user);
	console.log(users);
	res.redirect('login')
});

app.post('/login', function(req, res){
	console.log(req.body);
	var loginusername = req.body.username;
	var loginpass = req.body.password;
	for(i = 0; i < users.length; i++){
		if (loginusername === users[i].username){
			if(loginpass === users[i].password){
				res.redirect('home');
			}else{
				res.redirect('login');
			}
		}
	}
});


server.listen(3500, function(){
	console.log("I hear you master, we live on 3500")
});