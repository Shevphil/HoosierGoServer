let express = require('express');
let router = express.Router();
const validateSession = require('../middleware/validate-session');
const Event = require('../db').import('../models/eventmodel');

router.get('/practice', function(req, res){
    res.send('Hey! This event controller practice works!');
})

router.post('/create', validateSession, (req, res) => {

    const eventBuzz = {
        owner: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        eventName: req.body.event.eventName,
        location: req.body.event.location,
        content: req.body.event.content,
        contentImage: req.body.event.contentImage,
        author: req.user.id,
    }
    Event.create(eventBuzz)
        .then(event => res.status(200).json(event))
        .catch(err => res.status(500).json({ error: err}))
})

router.get("/", (req, res) => {
    Event.findAll()
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json({ error: err}))
});


router.get("/mine", validateSession, (req, res) => {
    let userid = req.user.id
    Event.findAll({
        where: { author: userid }
    })
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json({ error: err}))
});

router.get("/:location", validateSession, (req, res) => {
    let location = req.params.location;

    Event.findAll({
        where: { location: location }
    })
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json({ error: err}))
});

router.put("/update/:id", validateSession, function(req,res) {
    const updateeventBuzz = {
        eventName: req.body.event.eventName,
        location: req.body.event.location,
        content: req.body.event.content,
        contentImage: req.body.event.contentImage,
    };

    const query = { where: { id: req.params.postId, author: req.user.id} };

    Event.update(updateeventBuzz, query)
    .then((post) => res.status(200).json(post))
    .catch(err => res.status(500).json({ error: err}));
})

router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, author: req.user.id } };

    Event.destroy(query)
    .then(() => res.status(200).json({message: "Event Deleted."}))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;