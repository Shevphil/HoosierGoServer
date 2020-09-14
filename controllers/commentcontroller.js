const express = require('express');
const router = express.Router();
const Comment = require('../db').import('../models/commentmodel');
const validateSession = require('../middleware/validate-session');

router.get('/practice', validateSession, function(req, res) 
{
    res.send('Hey! This practice practice route works!')
});

router.post('/create', validateSession, (req, res) => {

    const commentPost = {
        owner: req.user.id,
        firstName: req.user.firstName,
        comment: req.body.comment.comment,
    }
    Comment.create(commentPost)
    .then(comment => res.status(200).json(comment))
    .catch(err => res.status(500).json({ error: err}))
})


router.get("/", (req, res) => {
    Comment.findAll()
    .then(comment => res.status(200).json(comment))
    .catch(err => res.status(500).json({ error: err}))
});

router.get('/mine', validateSession, (req, res) => {
    let userid = req.user.id
    Comment.findAll({
        where: {owner: userid }
    })
    .then(comment => res.status(200).json(comment))
    .catch(err => res.status(500).json({ error: err}))
});

router.put("/update/:commentId", validateSession, function(req,res) {
    const updatecommentPost = {
        content: req.body.post.content,
    };

    const query = { where: { id: req.params.commentId, owner: req.user.id} };

    Comment.update(updatecommentPost, query)
    .then((post) => res.status(200).json(post))
    .catch(err => res.status(500).json({ error: err}));
})

router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req. params.id, owner: req.user.id } };

    Comment.destroy(query)
    .then(() => res.status(200).json({message: "Comment Deleted."}))
    .catch((err) => res.status(500).json({ error: err }));
});


module.exports = router;