const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
if (uri) {
    mongoose.connect(uri, { useNewUrlParser: true });

    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log("mongoDB database connection established successfully");
    });
} else {
    console.log("Warning: ATLAS_URI not set. Skipping MongoDB connection — backend will start but DB ops will fail until configured.");
}

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter); //everytime the user goes to the root url and put /exe.. at the end it loads everything at this router!
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log("Server is running on port:" , port);
});