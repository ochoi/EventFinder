// Modules
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var fakerFunctions = require('./modules/fakerFunctions.js');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise
var dotenv = require('dotenv');
var handlebars = exphbs.handlebars;
// this Event is a filename object (have to call Event.Event to refer to Event schema)
var Event = require('./models/Event');
//var eqiv = require('./eqiv.js');

var PORT = process.env.PORT || 3000;

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
    Event.Event.find({}, function(err, events) {
        if (err) throw err;
        res.render('home', {
            events: events,
            //formatDate: formatDate
            //.format("ddd MMM DD YYY")
        });
    });
});

// get a list of all the events posted
app.get("/api/events", function(req, res) {
    // This is in JSON format right now
    Event.Event.find({}, function(err, events) {
        if (err) throw err;
        res.send(events);
    });
});

// get a list of all the users
app.get("/api/users", function(req, res) {
    // This is in JSON format right now
    Event.User.find({}, function(err, users) {
        if (err) throw err;
        res.send(users);
    });
});

// get a list of all the tickets
app.get("/api/tickets", function(req, res) {
    // This is in JSON format right now
    Event.Ticket.find({}, function(err, tickets) {
        if (err) throw err;
        res.send(tickets);
    });
});

// see the list of users registered to go to the event
app.get("/registered/:event", function(req, res) {
    Event.Event.findOne({ name: req.params.event }, function(err, event) {
        if (err) throw err;
        if (!event) return res.render('error');
        
        else return res.render('people', {
            people: event.registered
        });
    });

});

// go to a link with form to create an event
app.get("/addEvent/", function(req, res) {
    res.render('event', fakerFunctions.createEventName());
});

// alternative way to create an event in postman
app.post("/addEvent/", function(req, res) {
    var event = new Event.Event({
        name: req.body.name, 
        location: req.body.location, 
        host: req.body.host, 
        date: req.body.date, 
        registered: []
    });

    event.save(function(err) {
        if (err) res.render('error');
        else return res.render('success');
    });  
});

// register to go to that particular event as someone (input name and age)
app.get("/registerUser/:event", function(req, res) {
    res.render('registration', fakerFunctions.createUser(req.params.event));
});

// when the form in registration handlebar is submitted, the fields are sent here
// for the particular event, we update the array of it to include the person's name and age
app.post("/registerUser/:event/update", function(req, res) {
    var _event = req.params.event;
    var error = false;

    Event.Event.findOne({ name: _event }, function(err, event) {
        if (err) throw err;
        if (!event) return res.render('error');
        else {
            var user = new Event.User({
                name: req.body.name, 
                age: req.body.age
            });

            user.save(function(err) {
                if (err) error = true;
            });

            event.registered.push(user);

            event.save(function(err) {
                if (err) error = true;
            });
            var ticket = new Event.Ticket({
                event: event,
                user: user
            });

            ticket.save(function(err) {
                if (err) error = true;
            });

            if (error) return res.render('error');
            else return res.render('success');
        }
    });
});

// works
app.post("/registerUser/", function(req, res) {
    var user = new Event.User({
        name: req.body.name, 
        age: req.body.age
    });

    user.save(function(err) {
        if (err) res.render('error');
        return res.render('success');
    });  
});

// cancel the event by name
app.delete("/cancel/:name", function(req, res) {
    Event.Event.findOneAndRemove({ name: req.params.name }, function(err, event) {
        if (err) throw err;
        if (!event) {
            return res.render('error');
        }
        else res.render('success');
    });
});

// remove user from the event registration list *not working as intended
app.delete("/unRSVP/:username/from/:event", function(req, res) {
    var error = false;

    Event.User.findOneAndRemove({ name: req.params.username }, function(err, user) {
        if (err) throw err;
        if (!user) {
            error = true;
        }
        else {
            Event.Event.findOne({ name: req.params.event }, function(err, event) {
                if (err) throw err;
                if (!event) {
                    error = true;
                }
                else {
                    // event.registered.pop();
                    for( var i = 0; i < event.registered.length; i++){ 
                        if ( eqiv.eqiv(event.registered[i], user) ) {
                            event.registered = event.registered.splice(i, 1);
                        }
                    }

                    event.save(function(err) {
                        if (err) error = true;
                    });
                }
            });
        }
    });

    if (error) return res.render('error');
    else return res.render('success');

});

// empty the event registration list one by one
app.delete("/pop/from/:event", function(req, res) {
    var error = false;

    Event.Event.findOne({ name: req.params.event }, function(err, event) {
        
        if (err) throw err;
        if (!event) {
            error = true;
        }
        else {
            event.registered.pop();

            event.save(function(err) {
                if (err) error = true;
            });
        }
    });

    if (error) return res.render('error');
    else return res.render('success');

});

// a description page about our project
app.get("/about/", function(req, res) {
    res.render('about');
});

// Start listening on port PORT
app.listen(PORT, function() {
    console.log('Server listening on port:', PORT);
});