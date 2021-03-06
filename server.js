const express = require ('express');
var app = express ();
const fs = require ('fs');
const hbs = require ('hbs');
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req,res,next) => {
  var now = new Date().toString();
  var log = (`${now}: ${req.method} ${req.url}`);
  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});
// app.use((req,res,next) => {
//   res.render ('maintenance.hbs');
//
// });
app.use(express.static(__dirname + "/public"));
hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
app.get ('/', (req, res)=>{
res.render ('home.hbs', {
 welcomeMessage: "Welcome to out website",
 pageTitle: 'Home Page',
});
});

app.get ('/about', (req,res) => {
res.render ('about.hbs', {
  pageTitle: 'Abouttt page',
});
});

app.get ('/bad', (req,res) => {
  res.send ( {
    errorMessage: "Unbable to fetch request"
  });
});

app.get ('/projects', (req, res) => {
  res.render ( 'projects.hbs', {
    pageTitle: 'Projects'
  });
});

app.listen (port, () => {
  console.log (`Server is up in port ${port}`);
});
