const express = require('express');
const router = express.Router();
const user = require('../db').import('../models/usermodel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let validateSession = require('../middleware/validate-session');

router.get('/practice', validateSession, function(req, res) {
    res.send('Hey! This practice works!');
})

router.post('/create', function(req, res) { 

    user.create({
        firstName:req.body.user.firstName,
        lastName: req.body.user.lastName,
        email:req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 13),
        profilePic: req.body.user.profilePic,
        bio: req.body.user.bio,
    })
    .then(user => {
    
        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

          res.json({
              user: user,
              message: 'User successfully created!',
              sessionToken: token  
          });
      }
    )
    .catch(err => res.status(500).json({ error: err}))
});

router.post('/login', function(req, res) {

    user.findOne({
        where: {
           email: req.body.user.email 
        }
    })
    .then(function loginSuccess(user) {

        if (user) {
            bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
                if (matches) {
                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                    res.status(200).json({
                     user:user,
                     messsage: ('User successfully logged in!'),
                     sessionToken: token  
                    })

                } else {
                  res.status(502).send({ error: 'Login Failed'});
                }
            });
        } else {
            res.status(500).json({error: 'User does not exist.'})
        }        
      })
      .catch(err => res.status(500).json({error: err})) 
    }); 

    router.put("/update/:userId", validateSession, function(req,res) {
        const updateuserProfile = {
            firstName:req.body.user.firstName,
            lastName: req.body.user.lastName,
            profilePic: req.body.user.profilePic,
            bio: req.body.user.bio
        };
    
        const query = { where: { id: req.params.userId, accountHolder: req.user.id} };
    
        user.update(updateuserProfile, query)
        .then((post) => res.status(200).json(post))
        .catch(err => res.status(500).json({ error: err}));
    })



module.exports = router;