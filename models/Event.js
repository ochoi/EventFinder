var mongoose = require('mongoose');
mongoose.Promise=global.Promise;

// Schema 1
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    }
});

// Schema 2
var eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    registered: [userSchema]
});

// Schema 3
var ticketSchema = new mongoose.Schema({
    event: eventSchema,
    user: userSchema
})

var Event = mongoose.model('Event', eventSchema);
var User = mongoose.model('User', userSchema);
var Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = {
    Event,
    User,
    Ticket
}