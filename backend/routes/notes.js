const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const decodeToken = require('../middleware/decodeuser');
const { body, validationResult } = require('express-validator');

//ROUTE:1 fetch all notes of a User--> POST Method --> /api/notes/getallnotes :login required
router.get('/getallnotes', decodeToken, async (req, res) => {  //decodeToken is a middleware here, which is called before sending req.(this will apend request body)
    try {
        const notes = await Notes.find({ user: req.user.id }); //This will fetch all notes of logged in user.
        res.json(notes);

    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error!");
    }

})

//ROUTE:2 Add notes --> POST Method --> /api/notes/addnote :login required
router.post('/addnote', decodeToken,[
    body('title', 'title must be atleast 3 characters long!').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 characters long!').isLength({ min: 5 })
], async (req, res) => {  //decodeToken is a middleware here, which is called before sending req.(this will apend request body)

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, tag } = req.body;

        //Creating a note using UserId of logged in user.
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = note.save();
        res.json(note);

    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error!");
    }

})


//ROUTE:3 Update an existing user note --> PUT Method --> /api/notes/updatenote :login required
router.put('/updatenote/:id', decodeToken,[
    body('title', 'title must be atleast 3 characters long!').isLength({ min: 3 }),
    body('description', 'description must be atleast 10 characters long!').isLength({ min: 10 })
], async (req, res) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const {title, description, tag} = req.body;
        const newNote = {};
        if(title){newNote.title = title}; // If title is included in request body then add into newNote.
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};  

        //Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if(!note){ return res.status(404).send("Not Found!!")} //If note is not found

        if(note.user.toString() !== req.user.id){ return res.status(404).send("Not Found!!")} //If updatedNote's id is not same the userId logged in.

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json(note);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error!");
    }
})

//ROUTE:4 Delete an existing user note --> DELETE Method --> /api/notes/deletenote :login required
router.delete('/deletenote/:id', decodeToken, async (req, res) => {

    try {
        const {title, description, tag} = req.body;
       
        //Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if(!note){ return res.status(404).send("Not Found!!")} //If note is not found

        if(note.user.toString() !== req.user.id){ return res.status(404).send("Not Found!!")} //If updatedNote's id is not same the userId logged in.

        note = await Notes.findByIdAndDelete(req.params.id);
        res.status(200).json({"Success" :"Note Deleted Successfully! ",note: note});
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error!");
    }

})

module.exports = router
