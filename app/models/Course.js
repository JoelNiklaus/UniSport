// grab the mongoose module
var mongoose = require('mongoose');

// define our Course model
// module.exports allows us to pass this to other files when it is called
var Schema = mongoose.Schema;
var courseSchema = new Schema({
        description: String,
        activity: String,
        periods: String,
        times: String,
        level: String,
        place: String,
        leaders: String,
        responsible: String,
        comments: String,
        material: String,
        languages: String,
        Continuous: String,
        sport: String,
        university: String,
        link: String,
        dates: [String],
        number_of_participants: Number,
        max_number_of_participants: Number
    }
);

module.exports = mongoose.model('fribourgcourses', courseSchema);





