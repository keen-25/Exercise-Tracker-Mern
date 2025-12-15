const router = require('express').Router();
let Exercise = require('../models/exercise.model'); //this is the mongoose model that we just created

router.route('/').get((req,res) => {
    Exercise.find() // this is a mongooe method that gets all the exercises that are within the database
    .then(exercises => res.json(exercises)) //return something in json format which is the exercises in this case
    .catch(err => res.status(400).json('Error:' + err)); // this is an error message
}); // this handles incoming users git requests

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save() //this saves the nex user to the mongodb database
    .then(() => res.json('Exercise added!')) //its a promise
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(exercise => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
    exercise.username = req.body.username;
    exercise.description = req.body.description;
    exercise.duration = Number(req.body.duration);
    exercise.date = Date.parse(req.body.date);

    exercise.save() //this saves the nex user to the mongodb database
    .then(() => res.json('Exercise updated!')) //its a promise
    .catch(err => res.status(400).json('Error:' + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;