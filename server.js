// Require our dependecies
var express = require("express");
var mongoose = require("mongoose");
const Page = require('./models/Page.js')(mongoose); //import function which takes mongoose as arg, returns Page model
const Queue = require('./models/Queue.js')(mongoose);
const User = require('./models/User.js')(mongoose);
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 3000; //port from environment variables, default to 3000
mongoose.Promise = Promise; //changes mongoose asynchronous protocol from bluebird to native promises
var app = express();
const http = require('http').Server(app); //instantiates node-native http server based on app
const io = require('socket.io')(http); //mounts io protocol on native server
var db = process.env.MONGODB_URI || "mongodb://localhost/frontscrape"; //sets up database from environment variable, defaults to mongodb localhost

//SSL Certificate for HTTPS
// var fs = require('fs'),
//     express = require('express'),
//     https = require('https');

// var https_options = {
//   key: fs.readFileSync(__dirname +'/ssl-key.pem'),
//   cert: fs.readFileSync(__dirname +'/ssl-cert.pem')
// };
// var HOST = "localhost";



// PASSPORT CONFIGURATION DEPENDENCIES (Please do not move!)
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var session = require("express-session");
var bcryptjs = require("bcryptjs");
var flash = require('connect-flash');

// PASSPORT INITIALIZATION (Please do not move!)
app.use(session({ secret: 'secret', cookie: { maxAge: 900000 } }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Connect mongoose to our database
mongoose.connect(db, err => {
    // Log any errors connecting with mongoose
    if (err) {
        console.error(`mongoose connection error: ${err}`);
    }
    // Or log a success message
    else {
        console.log(`mongoose connection successful`);
    }
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public")); //serves public folder
require("./routes/routes.js")(app, io, Page, Queue, User); //imported function sets up routes and io logic;


// PASSPORT CONFIGURATION (Please do not move!)
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
var isValidPassword = function(user, password) {
    return bcryptjs.compareSync(password, user.password);
}
passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done) {
        // check in mongo if a user with username exists or not
        User.findOne({ 'email': username },
            function(err, user) {
                // In case of any error, return using the done method
                if (err)
                    return done(err);
                // Username does not exist, log error & redirect back
                if (!user) {
                    console.log('User Not Found with username ' + username);
                    return done(null, false,
                        req.flash('message', 'User Not found.'));
                }
                // User exists but wrong password, log the error 
                if (!isValidPassword(user, password)) {
                    console.log('Invalid Password');
                    return done(null, false,
                        req.flash('message', 'Invalid Password'));
                }
                // User and password both match, return user from 
                // done method which will be treated like success
                console.log('User login succesful\'ish');
                return done(null, user);
            }
        );
    }));
var createHash = function(password) {
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(10), null);
}
passport.use('signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done) {
        findOrCreateUser = function() {
            // find a user in Mongo with provided username
            User.findOne({ 'email': username }, function(err, user) {
                // In case of any error return
                if (err) {
                    console.log('Error in SignUp: ' + err);
                    return done(err);
                }
                // already exists
                if (user) {
                    console.log('User already exists');
                    return done(null, false,
                        req.flash('message', 'User Already Exists'));
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUser = new User();
                    // set the user's local credentials
                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.email = req.param('email');
                    newUser.firstName = req.param('firstName');
                    newUser.lastName = req.param('lastName');

                    // save the user
                    newUser.save(function(err) {
                        if (err) {
                            console.log('Error in Saving user: ' + err);
                            throw err;
                        }
                        console.log('User Registration succesful');
                        return done(null, newUser);
                    });
                }
            });
        };

        // Delay the execution of findOrCreateUser and execute 
        // the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    }));


// Start the server

// var server = https.createServer(https_options, app)
//                   .listen(PORT, HOST);
app.listen(PORT, function() {
  console.log("Now listening on port %s! Visit localhost:%s in your browser.", PORT, PORT);
});

// console.log('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+');
// console.log('HTTPS Server listening @ https://%s:%s', HOST, PORT);
// console.log('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+');

