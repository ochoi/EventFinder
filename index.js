// Modules
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise
var dotenv = require('dotenv');
var handlebars = exphbs.handlebars;
var Event = require('./models/Event');

// Use 2 new npm packages not used before
// create at least 2 modules to separate functionality
var PORT = 3000;

// Load envirorment variables
dotenv.config();

// Connect to MongoDB
console.log(process.env.MONGODB)
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

// Set up Express
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// MIDDLEWARE 
app.use(logger('dev'));
app.engine('handlebars', exphbs({ defaultLayout: 'main', partialsDir: "views/partials/" }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

// Web Socket
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Default Endpoint
app.get("/", function(req, res) {
    Event.find({}, function(err, events) {
        if (err) throw err;
        res.render('home', {
            events: events
        });
    });
});

/* At least 10 different endpoints (2 post, 2 delete) */

// get a list of all the events posted
app.get("/event/", function(req, res) {
    // This is in JSON format right now
    Event.find({}, function(err, events) {
        if (err) throw err;
        res.send(events);
    });
});

// see the list of users registered to go to the event
app.get("/:event/users", function(req, res) {

});

// go to a link with form to create an event
app.get("/register/", function(req, res) {
    res.render('event');
});

// alternative way to create an event
app.post("/register/", function(req, res) {
    var event = new Event({
        name: req.body.name, 
        location: req.body.location, 
        host: req.body.host, 
        date: req.body.date, 
        registerd: []
    });

    event.save(function(err) {
        if (err) res.render('error');
        return res.render('success');
    });  
});

// sign up as a user in the database
app.post("/signup/", function(req, res) {
    var user = new User({
        name: req.body.name, 
        age: req.body.age, 
    });

    user.save(function(err) {
        if (err) res.render('error');
        return res.render('success');
    });  
});

// cancel the event
app.delete("/cancel/:id", function(req, res) {
    // Not working yet
    // Event.findByIdAndRemove(req.params.id, function(err, event) {
    //     if (err) throw err;
    //     if (!event) {
    //         return res.send('No event found with given ID.');
    //     }
    //     res.send('Event deleted!');
    // });
});

// a description page about our project
app.get("/about/", function(req, res) {
    res.render('about');
});

// Start listening on port PORT
app.listen(PORT, function() {
    console.log('Server listening on port:', PORT);
});