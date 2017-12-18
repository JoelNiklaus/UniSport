// grab the mongoose module
var mongoose = require('mongoose');

// define our Reservation model
// module.exports allows us to pass this to other files when it is called
var Schema = mongoose.Schema;
var reservationSchema = new Schema({
    course_id: String,
    firstname: String,
    lastname: String,
    email: String
});
module.exports = mongoose.model('Reservation', reservationSchema);

