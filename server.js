const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	let now = new Date().toString();
	let log = `${now}: ${req.method} ${req.url}`;
	
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server log.');
		}
	});
	next();
});

//app.use((req, res, next) => {
	
//	res.render('maintance.hbs', {
//		pageTitle: 'Down For Maintance'
		
//	});

//});

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome the a test home page.'
	});
	
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
		
	});
	
});


app.get('/bad', (req, res) => {
	res.send({
		Error: 'This page does not exsist.',
		ErrorNum: '404'
	});
});

app.listen(3000);