let express = require('express');
let router = express.Router();
const validateSession = require('../middleware/validate-session');
const Post = require('../db').import('../models/postmodel');

router.get('/practice', validateSession, function(req, res) 
{
    res.send('Hey! This post practice route works!')
});

router.post('/create', validateSession, (req, res) => {


    const postEntry = {
        owner: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        location: req.body.post.location,
        content: req.body.post.content,
        contentImage: req.body.post.contentImage,
        author: req.user.id,
    }
    Post.create(postEntry)
        .then(post => res.status(200).json(post))
        .catch(err => res.status(500).json({ error: err}))
})

router.get("/", (req, res) => {
    Post.findAll()
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({ error: err}))
});


router.get("/mine", validateSession, (req, res) => {
    let userid = req.user.id
    Post.findAll({
        where: { author: userid }
    })
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({ error: err}))
});

router.get("/:location", validateSession, (req, res) => {
    let location = req.params.location;

    Post.findAll({
        where: { location: location }
    })
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({ error: err}))
});

router.put("/update/:id", validateSession, function(req,res) {
    const updatePostEntry = {
        location: req.body.post.location,
        content: req.body.post.content,
        contentImage: req.body.post.contentImage,
    };

    const query = { where: { id: req.params.postId, author: req.user.id} };

    Post.update(updatePostEntry, query)
    .then((post) => res.status(200).json(post))
    .catch(err => res.status(500).json({ error: err}));
})

router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req. params.id, author: req.user.id } };

    Post.destroy(query)
    .then(() => res.status(200).json({message: "Post Deleted."}))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;