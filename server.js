const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const passportSetup = require('./config/middleware/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/middleware/keys')
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('connected to mongodb');
})

// Import routes and give the server access to them.
const routes = require('./routes/routes.js');

// create home route
app.get('/', (req, res) => {
  res.render('index');
});

// setup routes with condition that routes must have authorization
app.use('/auth', routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
