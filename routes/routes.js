var path = require('path');
var passport = require('passport');

module.exports = function(app, io, Page, Queue, User) {
    app.get('/', (req, res) => { //root route sends index.html
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get('/index/:query', (req, res) => {
        var query = tokenize(req.params.query); //gives array of words
        Page.find({
            searchables: {
                $in: query
            }
        }).sort({
            pagescore: 'desc'
        }).exec((err, doc) => {
            if (err) {
                console.error(err);
            } else {
                res.json(doc);
            }
        });
    });

    app.post('/index', (req, res) => {
        console.log("====================================")
        console.log("Scraped data received #/index")
        console.log("====================================")


        req.body.forEach(element => {
            var newElement = JSON.parse(element)
            new Page(newElement).save((err, doc) => {

                if (err) {
                    console.error(err);
                } else {
                    doc.links.forEach(link => {
                        Page.findOneAndUpdate({ url: link }, { $inc: { pagescore: 1 } }, { returnNewDocument: true }).exec((err, doc) => {
                            if (err) {
                                console.error(err)
                            } else {
                                new Queue({ url: link }).save((err, doc1) => {
                                    if (err) {
                                        console.log("error in saving Queue")
                                        console.error(err);
                                    } else {

                                    }
                                })

                            }
                        })
                    });
                }
            });
        });
    })

    //We save our dummy queue data to Queue db with this route
    app.post("/queue", (req, res) => {
        req.body.forEach(element => {
            new Queue(element).save((err, doc) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log("working")
                }
            })
        })
        res.end();
    })

    //Calling Queues from the db
    app.post('/queues', (req, res) => {
        var q = Queue.find({}).limit(10);
        q.exec(function(err, doc) {
            if (err) {
                console.log("error");
                res.json(err);
            } else {
                console.log("====================================")
                console.log("List of URLs sent to client #/queues")
                console.log("====================================")
                Queue.find({}).limit(10).remove().exec();
                console.log("Removing scraped URLs from Queue db")
                res.json(doc);
            }
        });
    });



    // JOHN'S STUFF (MOSTLY PASSPORT AUTH AND INDIVIDUAL ACCOUNT STUFF) STARTS HERE

    // /* GET login page. */
    // app.get('/', function(req, res) {
    //     // Display the Login page with any flash message, if any
    //     res.render('index', { message: req.flash('message') });
    // });

    /* Handle Login POST */
    app.post('/login', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    }));

    // /* GET Registration Page */
    // app.get('/signup', function(req, res) {
    //     res.render('register', { message: req.flash('message') });
    // });

    /* Handle Registration POST */
    app.post('/signup', passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
        console.log('User logout succesful\'ish');
    });

    app.get('/user', function(req, res) {
        res.json(req.user);
    });

    app.post('/delete/:email', function(req, res) {
        User.remove({ email: req.params.email }, function(err) {
            if (err) console.log(err);
            res.redirect('/');
        });
    });

    app.get('/contributionScore/:email', function(req, res) {
        User.find({ email: req.params.email }, function(err, response) {
            if (err) console.log(err);
            res.json(response[0].contributionScore);
        });
    });

    app.get('/totalScore', function(req, res) {
    	Page.count({}, function(err, c) {
    		if (err) console.log(err);
    		res.json(c);
    	});
    });

    // JOHN'S STUFF (MOSTLY PASSPORT AUTH AND INDIVIDUAL ACCOUNT STUFF) ENDS HERE



    //     io.on('connection', socket => {
    //         console.log('socket connected on ' + socket.id);

    //         socket.emit('bundle', { hello: 'world' });

    //         socket.on('send more', () => {
    //             socket.emit('bundle', { hello: 'world' });
    //         });

    //         socket.on('data', data => {
    //             console.log(data);
    //         });

    //         socket.on('disconnect', function() {
    //             console.log('user disconnected');
    //         });
    //     });

}

const tokenExp = /[^\+]+/g;
const stopwords = require('stopwords').english;
var tokenize = function(string) {
    const tokens = [];
    while ((match = tokenExp.exec(string)) !== null) {
        tokens.push(match[0]);
    }
    console.log("query tokenized");
    return tokens.filter(token => !stopwords.includes(token));
}
