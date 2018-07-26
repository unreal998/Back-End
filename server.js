const express = require('express');
const bodyParser = require('body-parser');
const morgan = require("morgan");
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require("express-session")
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const passport = require("passport");
const flash = require('connect-flash');

const app = express();

require("./config/passport")(passport);
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, { 
   useNewUrlParser: true,
  }, () => {
	console.log('Connect to database');
})

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//Body Parser 
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Cookie Parser
app.use(cookieParser());
// Morgan 
app.use(morgan("dev"));

app.use(session({
  secret: "secret123",
  saveUninitialized: true,
  resave: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require("./routes/route")(app, passport);

//Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000; 
app.listen(port,() => {
	console.log(`Server start on the port ${port}`)
})