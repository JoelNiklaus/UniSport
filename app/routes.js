// grab the models
const Course = require('./models/Course');
const Reservation = require('./models/Reservation');
var verifier = require('email-verify');

module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes
//
     
    app.post('/api/makeReservation', function (req, res, next) {
        var check=false;   //this check var will tell us if there is a student already registred on the current course
        var course1 =req.body.course_id ;  
        var n; // variable to store the current number of participants
                  verifier.verify(req.body.email, function( err, info ){






  if( err ) res.end("email not valid");
  else{

         Course.findById(req.body.course_id, function (err, course) {
            if (err)
                res.status(500).send("We need a valid course to make a reservation.");
            n=course.number_of_participants; // store the current number here 

        });
//
//here i go to the reservation db and i check all the mongodb object where i have the current email and surely check if it's the current course
        Reservation.find({email: new RegExp(req.body.email, "i")}, function (err, reserv) {
            var j;
            for(j=0;j<reserv.length;j++){
                if(reserv[j].course_id==course1) check=true;

            }
        });

        Course.findById(req.body.course_id, function (err, course) {
            if (err)
                res.status(500).send("We need a valid course to make a reservation.");

        });

        if (!req.body.firstname || !req.body.lastname || !req.body.email)
            res.status(500).send("We need you to fill out the entire form.");

        // TODO validate, that each email can only be registered once per course!

        new Reservation(req.body).save((err, createdReservation) => {
                if (!check) {
                    if (err) {
                        res.status(500).send(err);
                    }
                    // This createdReservation is the same one we saved, but after Mongo
                    // added its additional properties like _id.
                else{   

        Course.findById(req.body.course_id, function (err, course) {
            if (err) handleErro(err);
                
            course.number_of_participants=n+1;  //increment the current number
                course.save((err,todo)=>{//save it 
                    if(err) console.log(err);

                });


            } 

        );

            
            
                    res.status(200).send(createdReservation);
                    res.end("ok");}
                } else {
                    res.send("your are already registered for this course.");
                }
            }
            );


  }
});





    });


    app.get('/api/getCourse/:course_id', function (req, res) {
        // use mongoose to get a course from the database
        Course.findById(req.params.course_id, function (err, course) {
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(course); // return found course in JSON format
        });
    });

    app.get('/api/allCourses', function (req, res) {
        // use mongoose to get all courses in the database
        Course.find(function (err, courses) {
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(courses); // return all courses in JSON format
        });
    });

    // route to handle creating goes here (app.post)

    app.post('/api/searchCourses', function (req, res) {
        // use mongoose to search for courses in the database
        Course.find({course_name: new RegExp(req.body.course_name, "i")}, function (err, courses) {
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
       

            if (err)
                res.send(err);

            
            res.json(courses); // return all courses in JSON format
        });
    });

   
 

        

    app.post('/api/getCoursesByDateRange', function (req, res) {
        // use mongoose to search for courses in the database
        // TODO perhaps modify this (include end_datetime) if we have courses spanning over multiple days
        Course.find({
            start_datetime: {
                $gte: req.body.start_datetime,
                $lt: req.body.end_datetime
            }
        }, function (err, courses) {
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(courses); // return all courses in JSON format
        });
    });

    app.post('/send', function (req, res) {
        var output = `
        <p>A new contact request from UniSport</p>
        <h3>Contact Details</h3>
        <ul>
            <li> Name: ${req.body.name}</li>
            <li> Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
        `
        ;

        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'unisport.benefr@gmail.com',
                pass: 'mouadjoelvictor321'
            },
            tls:{
                rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols
        var mailOptions = {
            from: '"UniSport Contact Service" <unisport.benefr@gmail.com>', // sender address
            to: 'victor.hutse@unifr.ch', // list of receivers
            subject: 'UniSport Contact', // Subject line
            text: 'Hello world?', // plain text body
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info) {
            if(error){
                return false;
            }
            else{
                console.log('Message sent: ' + info.response);
                return true;
            }
        });

        res.send({"Msg":"Your message has been sent."})

    });

    /**
    app.post('/send', (req, res) => {
        var output = `
        <p>A new contact request from UniSport</p>
        <h3>Contact Details</h3>
        <ul>
            <li> FirstName: ${req.body.firstName}</li>
            <li> LastName: ${req.body.lastName}</li>
            <li> Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
        `;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'unisport.benefr@gmail.com',
                pass: 'mouadjoelvictor321'
            },
            tls:{
                rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"UniSport Contact Service" <unisport.benefr@gmail.com>', // sender address
            to: 'victor.hutse@unifr.ch', // list of receivers
            subject: 'Unisport Contact', // Subject line
            text: 'Hello world?', // plain text body
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);

        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.send({msg: 'Email has been sent'});

        });
    });

     */

    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html');
    });

};