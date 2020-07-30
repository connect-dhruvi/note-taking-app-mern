const express = require('express');
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const Note = require('../models/Note');
const { session } = require('passport');
const { mongo } = require('mongoose');
const { check, validationResult } = require('express-validator');

const userRouter = express.Router();

const signToken = userid => {
    return JWT.sign(
        {
            iss: "Dhruvi",
            sub: userid
        }, "mErn", { expiresIn: "1h" }
    );
}

// To register
userRouter.post('/register', (req, res) => {
    //console.log("it is here");
    const { username, password, role, email, firstname, lastname } = req.body;
    User.findOne({ username }, (err, user) => {
        if (err)
            res.status(500).json({ msg: 'Error has occured' });
        if (user)
            res.status(400).json({ msg: 'This username already exists' });
        else {
            const newUser = new User({
                username, password, role, email, firstname, lastname
            })
            newUser.save(err => {
                if (err)
                    res.status(500).json({ msg: ' This user can not be saved' });
                else
                    res.status(201).json({ msg: ' Account has been created' });
            })
        }
    })
});

// To login
userRouter.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        const { _id, username, role } = req.user;
        const token = signToken(_id);
        //http only and same site to prevent cross - site attacks
        // res.cookie('access_token',token,{httpOnly: true , sameSite: true });
        res.status(200).json({ isAuthenticated: true, token: token, user: { username, role } });
        // res.writeHead(200, {'credentials': 'same-origin'});
    }
    /* else{
         res.status(500).json({isAuthenticated: false , user : { username} + ' , check your credentials'});
     }*/
});

// To logout user 
userRouter.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {

    res.clearCookie('access_token');
    res.json({ user: { username: "", role: "", success: true } });
});

// To create a note for current logged in user
userRouter.post('/note',
    [
        check('text', 'text is empty').not().isEmpty(),
    ],
    passport.authenticate('jwt', { session: false }),

    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({ errors: error.array() })
        }
        const note = new Note(req.body);
        note.save(err => {
            if (err)
                res.status(500).json({ msg: ' This note can not be saved' });
            else
                req.user.notes.push(note);
            req.user.save(err => {
                if (err)
                    res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
                else
                    res.status(200).json({ message: { msgBody: "Successfully created note", msgError: false } });
            });
        });
    });

// To get notes of current logged  in user
userRouter.get('/notes', passport.authenticate('jwt', { session: false }), async (req, res) => {
    //console.log(req.user._id);
    await User.findById({ _id: req.user._id }).populate('notes').exec((err, document) => {
        if (err)
            res.status(500).json({ msg: 'Some error took place' });
        else
            res.status(200).json({ notes: document.notes, authenticated: true });

    });
});

userRouter.get('/admin', passport.authenticate('jwt', { session: false }), (req, res) => {
    //console.log(req.user._id);
    if (req.user.role === 'admin')
        res.status(200).json({ message: 'Welcome,admin' });
    else
        res.status(403).json({ message: " Please sign in as a user" });

});

// check current logged in user
userRouter.get('/authenticated', passport.authenticate('jwt', { session: false }), async (req, res) => {
    //console.log(req.user._id);
    const { username, role } = await req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
});

// To delete a note
userRouter.delete('/note/delete',
    passport.authenticate('jwt', { session: false }),
    [
        check('id', 'ID is empty').not().isEmpty(),
    ],
    async (req, res) => {

        var noteId = await req.user.notes.find(x => x == req.body.id);
        if (!noteId) {
            return res.status(401).send('Not authorized.');
        }

        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({ errors: error.array() })
        }
        const note = await Note.findById(req.body.id);

        if (!note) {
            res.json({ msg: 'Note id not found' });
        }

        try {
            req.user.notes = req.user.notes.filter(x => x != req.body.id);
            await req.user.save();
            await Note.findByIdAndRemove({ _id: req.body.id });
            res.json({ msg: 'Note is deleted' });
        }
        catch (err) {
            res.status(500).send('SERVER ERROR' + err);
        }
    });

// PUT
// UPDATE
// note/update

userRouter.put('/note/update',
    [
        check('id', 'id is empty').not().isEmpty(),
        check('text', 'text is empty').not().isEmpty(),
        check('isPriority', 'give the priority of the note').not().isEmpty()
    ],
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({ errors: error.array() })
        }
        try {
            var noteId = req.user.notes.find(x => x == req.body.id);
            if (!noteId) {
                return res.status(401).send('Not authorized.');
            }

            const noteUpdt = await Note.findById(noteId)
            if (!noteUpdt) {
                return res.status(404).send('Note not found');
            }

            noteUpdt.text = req.body.text;
            noteUpdt.isPriority = req.body.isPriority;

            await noteUpdt.save();
            res.send({ message: 'User note is updated successfully', note: noteUpdt });
        }
        catch (err) {
            res.status(500).send('SERVER ERROR');
        }


    });

module.exports = userRouter;    