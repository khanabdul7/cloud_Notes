const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Creating a User--> POST Method --> /api/auth/create_user
router.post('/create_user', [
    body('name', 'name must be atleast 3 characters long!').isLength({ min: 3 }),
    body('email', 'Enter a Valid Email Address').isEmail(),
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
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry, a user with this email is already exist!" })
        }

        const salt = await bcrypt.genSalt(10); //Generating a salt. 
        const secPasswd = await bcrypt.hash(req.body.password, salt); //Genrating a hash using password and salt.

        //Creating user
        user = await User.create({
            name: req.body.name,
            password: secPasswd,
            email: req.body.email
        })

        const JWT_SECRET = 'mynameiskhan';
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET); //Signing a jwt token with payload(data) and signature(JWT_TOKEN)  

        res.json({ authToken });
    } catch (e) {
        console.error(e.message); //showing error message on console.
        res.status(500).send("some problems occur!!"); //showing this error message in api response.
    }
})

module.exports = router
