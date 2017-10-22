// grab the nerd model we just created
var Course = require('./models/Course');

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

    // sample api route
    app.get('/api/courses', function(req, res) {


        //res.send("test");
        // use mongoose to get all nerds in the database
        Course.find(function(err, courses) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);


            //res.send("test");
            res.json(courses); // return all nerds in JSON format
        });
    });

    app.post('/chercher', function(req, res) {


        //res.send("test");
        // use mongoose to get all nerds in the database
        Course.find(function(err, courses) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);


            //res.send("test");
            res.json(courses); // return all nerds in JSON format
        });
    });

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};