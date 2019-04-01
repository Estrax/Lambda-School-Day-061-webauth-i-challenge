const router = require('express').Router();
const db = require('../database/helpers/helpers');
const bcrypt = require('bcryptjs');

router.route('/register')
    .post(async (req, res) => {
        let user = req.body;
        user.password = bcrypt.hashSync(user.password, 12);
        await db
                .addUser(user)
                .then(id => {
                    res
                        .status(201)
                        .json({ id });
                })
                .catch(err => {
                    res
                        .status(500)
                        .json("There was an error saving user to the database!");
                });
    });

router.route('/login')
    .post(async (req, res) => {
        const userData = req.body;
        await db
                .getUserByUsername(userData.username)
                .then(user => {
                    if(user.length && bcrypt.compareSync(userData.password, user.password)){
                        req.session.userID = user.id;
                        res.json({ message: 'Correct' });
                    }else{
                        res
                            .status(404)
                            .json({ message: 'You shall not pass'});
                    }
                })
                .catch(err => {
                    res
                        .status(500)
                        .json({ err });
                });
    });

module.exports = router;