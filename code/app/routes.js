// grab the nerd model we just created
var Course = require('./models/Course');

module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    app.get('/api/allCourses', function (req, res) {
        // use mongoose to get all nerds in the database
        Course.find(function (err, courses) {
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(courses); // return all courses in JSON format
        });
    });

    app.post('/api/searchCourses', function (req, res) {
        // use mongoose to get all courses in the database
        Course.find({course_name: new RegExp(req.body.course_name, "i")}, function (err, courses) {
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(courses); // return all courses in JSON format
        });
    });

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html');
    });

};