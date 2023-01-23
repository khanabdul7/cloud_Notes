const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Creating a User--> POST Method --> /api/auth
router.post('/', [
    body('name', 'name must be atleast 3 characters long!').isLength({ min: 3 }),
    body('email','Enter a Valid Email Address').isEmail(),
    body('password', 'Password must be atleast 5 character long!').isLength({ min: 5 })
], (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Creating a User using user schema.
    // const user = User(req.body);
    // user.save();
    // res.json(req.body);

    //Alternative Way
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
      }).then(user => res.json(user))
      .catch(err => {console.log(err) // this will show in terminal.
    res.json({error: "Please enter unique email!!"})}) // this will show in response of api request.
})

module.exports = router
