// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
var Schema = mongoose.Schema;
var courseSchema = new Schema({
    course_name: String,
    start_datetime: Date,
    end_datetime: Date,
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


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("Hooray");
});
