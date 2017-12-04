// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
var Schema = mongoose.Schema;
var courseSchema = new Schema({
    course_name: String,
    start_datetime: Date,
    end_datetime: Date,
    number_of_participants: Number,
    max_number_of_participants: Number,
    address: {
        place: String,
        institution: String,
        street: String,
        number: Number,
        plz: Number,
        city: String
    }
});
module.exports = mongoose.model('Course', courseSchema);

///