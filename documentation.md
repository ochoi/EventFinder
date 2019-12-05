
# Event Finder

---

Name: On Choi, 

Date: November 29th, 2019

Project Topic: Event Finder

URL: need to deploy to Heroku.
 ---

### 1. Data Format and Storage

(Below are placeholder for now.)

Schema 1: 
```javascript
{
    name: String,
    breed: String,
    weight: Number, 
    age: Number,
    characteristics: [String]
}
```

Schema 2: 
```javascript
{
    name: String,
    breed: String,
    weight: Number, 
    age: Number,
    characteristics: [String]
}
```

Schema 3: 
```javascript
{
    name: String,
    breed: String,
    weight: Number, 
    age: Number,
    characteristics: [String]
}
```

### 2. Live Updates

### 3. View Data

GET endpoint route: `/api/...`

### 4. Add New Data / API

Assuming no event with the same name is allowed!

HTML form route: `/addDog`

POST endpoint route: `/api/addDog`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/addDog',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
        name: 'Cupcake', 
        breed: 'German Shepherd',
        image: "http://i.imgur.com/iGLcfkN.jpg",
        age: 6
        characteristics: ["Brown", "Black", "Sleepy", "Lazy"]
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 5. Modules

Module Name: `name`

### 6. NPM Packages


