# Event Finder
 
---
 
Name: On Choi, Aidan McGovern
 
Project Topic: Event Finder
 
URL: https://desolate-dusk-77559.herokuapp.com/
 
 ---
 
## Data Format and Storage
 
userSchema: 
```javascript
{
    name: String,
    age: Number
}
```
 
eventSchema: 
```javascript
{
    name: String,
    location: String,
    host: String, 
    date: Date, 
    registered: [userSchema]
}
```
 
ticketSchema: 
```javascript
{
    event: [eventSchema],
    user: [userSchema]
}
```
 
## Live Updates / Sockets
Chatroom: Added a realtime chatroom where users can talk about the different events they're signed up for or are interested in.

## Handlebar Pages
about: Page with description and group member names.<br>
error: Generic error page.<br>
success: Generic success page.<br>
home: Structure used to display events on home page.<br>
event: Page with form for event registration.<br>
people: Page that lists users attending specific event.<br>
registration: Page for users to sign of for specific events using form.<br>
nav: Code to generate static navigation bar on all handlebars.<br>

## View Data / GET endpoints
 
GET endpoint routes:<br>
Get all events. `/api/events`<br>
Get all users. `/api/users`<br>
Get all tickets. `/api/tickets`<br>
List of users going to :event. `/api/registered/:event`<br>
List of tickets :user has reserved. `/api/tickets/user/:user`<br>
List of tickets associated with an event `/api/tickets/event/:event`<br>
 
## Add New Data / POST endpoints
#### Add user to event (and create associated ticket)
HTML form route: `/registerUser/:event`
 
#### Add event
HTML form route: `/addEvent`
POST endpoint route: `/addEvent`
 
Example Node.js POST request to endpoint: 
```javascript
var request = require("request");
 
var options = { 
    method: 'POST',
    url: 'https://desolate-dusk-77559.herokuapp.com/addEvent',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
        name: 'testName', 
        location: 'testLocation',
        host: 'testHost', 
        date: '12/06/2019', 
        registered: []
    } 
};
 
request(options, function (error, response, body) {
  if (error) throw new Error(error);
 
  console.log(body);
});
```
 
## Delete Data / DELETE endpoints
Delete event by name: `/cancel/:name`<br>
Delete people from event `/pop/from/:event`<br>
 
## Modules
`./modules/helper.js` Helper method that reduce repetitive code about rendering success or error page
`./modules/fakerFunction.js` Isolates faker.js logic to generate mongodb objects.
 
## NPM Packages
```
faker.js, https://github.com/marak/Faker.js/
Generate massive amounts of fake data in the browser and node.js.
In this project, used to generate random placeholder data in the forms that can be used to guide users on how forms should be filled, and to generate fake events, people, etc.
```
 
```
cat-ascii-faces, https://github.com/melaniecebula/cat-ascii-faces
Create cute cat emojis on the web.
This can be used to greet/welcome user to our website :3
```
 
