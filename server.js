const express = require("express");
const bodyParser = require("body-parser");


const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync(); 

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to The Store application." });
});

const routing=require('./app/routes/routing.route')

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use('/api',routing)