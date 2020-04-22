const express = require(`express`);
const router = express.Router();
const moment = require(`moment-timezone`)

// Import the model (burger.js) to use its database functions.
const burger = require(`../../models/burger.js`);

// Create all our routes and set up logic within those routes where required.
router.get(`/`, function (req, res) {
  burger.selectAllByDate(`DESC`, data => {
    data = data.map(i => {
      i.date_eaten = moment(i.date_eaten).calendar()
      return i
    })


router.put(`/api/burgers/:id`, (req, res) => {
  const condition = `id = ` + req.params.id;

  burger.updateOne(req.body, condition, result => {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end()
    } else {
      res.status(200).end()
    }
  })
})


router.post(`/api/burgers`, function (req, res) {
  burger.insertOne([`burger_name`], [req.body.name], result => {
    // Send back the ID of the new burger
    res.json({ id: result.insertId })
  })
})

router.delete(`/api/burgers/:id`, function (req, res) {
  burger.delete(req.params.id, result => {
    // Send back the ID of the new burger
    res.json({ id: result.insertId })
  })
})


// Export routes for server.js to use.
module.exports = router