var mongoose = require('mongoose');
mongoose.Promise=global.Promise;

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    }
});

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
        type: Number,
        required: true
    },
    registerd: [userSchema]
});

var ticketSchema = new mongoose.Schema({
    event: eventSchema,
    user: userSchema
})

var Event = mongoose.model('Event', eventSchema);
module.exports = Event;