const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Creating a User--> POST Method --> /api/auth/create_user
router.post('/create_user', [
    body('name', 'name must be atleast 3 characters long!').isLength({ min: 3 }),
    body('email','Enter a Valid Email Address').isEmail(),
    body('password', 'Password must be atleast 5 character long!').isLength({ min: 5 })
], async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        //Check if a user with this email is already exist
        let user = await User.findOne({email: req.body.email});
        if (user){
            return res.status(400).json({error: "Sorry, a user with this email is already exist!"})
        }
    
        // Creating a User using user schema.
        // const user = User(req.body);
        // user.save();
        // res.json(req.body);
    
        //Alternative Way
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
          })
          
        
        res.json(user);
    } catch(e) {
        console.error(e.message);
        res.status(500).send("some problems occur!!");
    }
})

module.exports = router
