const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//we do the same thing here as we do in user, but, rather than having one field we have four fields. Each are required
const exerciseSchema = new Schema({ 
    username: { type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date, required: true},
    },
{
    timestamps: true,
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;

//from here we add api so that we can do the crude operations ie. routes folder