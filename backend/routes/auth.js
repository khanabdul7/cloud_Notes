const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const decodeToken = require('../middleware/decodeuser');
const { default: userEvent } = require('@testing-library/user-event');
const JWT_SECRET = 'mynameiskhan';

//ROUTE:1 Creating a User--> POST Method --> /api/auth/signup :No login required
router.post('/signup', [
    body('name', 'name must be atleast 3 characters long!').isLength({ min: 3 }),
    body('email', 'Enter a Valid Email Address').isEmail(),
    body('password', 'Password must be atleast 5 character long!').isLength({ min: 5 })
], async (req, res) => {
    let success = false
    console.log(req.body);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        //Check if a user with this email is already exist
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry, a user with this email is already exist!" })
        }

        const salt = await bcrypt.genSalt(10); //Generating a salt. 
        const secPasswd = await bcrypt.hash(req.body.password, salt); //Genrating a hash using password and salt.

        //Creating user
        user = await User.create({
            name: req.body.name,
            password: secPasswd,
            email: req.body.email
        })


        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET); //Signing a jwt token with payload(data) and signature(JWT_TOKEN)  

        success = true
        res.json({ success, authToken });
    } catch (e) {
        console.error(e.message); //showing error message on console.
        res.status(500).send("Interna Server Error!"); //showing this error message in api response.
    }
})

//ROUTE:2 Authenticating a User--> POST Method --> /api/auth/login :No login required
router.post('/login', [
    body('email', 'Enter a Valid Email Address').isEmail(),
    body('password', 'Password should not be blank!').exists(),
], async (req, res) => {
    let success = false
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;  //Destructing
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Please try again with correct credentials!" });
        }

        const checkPasswd = await bcrypt.compare(password, user.password);
        if (!checkPasswd) {
            return res.status(400).json({ success, error: "Please try again with correct credentials!" });
        }

        const name = user.name;

        const data = {         //Sending userId in payload to sign JWT token
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({ success, name, authToken });


    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error!");
    }
})


//ROUTE:3 Get details of a User--> POST Method --> /api/auth/getuser :login required
router.post('/getuser', decodeToken, async (req, res) => {  //decodeToken is a middleware here, which is called before sending req.(this will apend request body)

    let success = false
    const userId = req.user.id;
    try {
        const user = await User.findById(userId).select('-password'); //This will fetch user details using id except the password.
        success = true
        res.json({ success, user});

    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error!");
    }

}
)

module.exports = router
