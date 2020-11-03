const router = require('express').Router();


// Import the model (meal.js) to use its database functions.
var meal = require("../models/meal.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  meal.all(function(data) {
    var hbsObject = {
      meals: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/meals", function(req, res) {
  meal.create([
    "meal_name"
  ], [
    req.body.name,
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});


router.delete("/api/meals/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  meal.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// auth login
router.get('/login', (req, res) => {
  res.render('login');
});

// auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  res.send('logging out')
})

// auth with Google
router.get('/google', (req, res) => {
  // handle with passport
  res.send('logging in with Google')
});

// Export routes for server.js to use.
module.exports = router;
