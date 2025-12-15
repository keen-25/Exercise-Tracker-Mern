const router = require('express').Router();
let User = require('../models/user.model'); //this is the mongoose model that we just created

router.route('/').get((req, res) => {
    User.find() // this is a mongooe method that gets all the users that are within the database
    .then(users => res.json(users)) //return something in json format which is the users in this case
    .catch(err => res.status(400).json('Error: ' + err)); // this is an error message
}); // this handles incoming users git requests

router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save() //this saves the nex user to the mongodb database
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;