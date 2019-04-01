const router = require('express').Router();
const db = require('../database/helpers/helpers');
const bcrypt = require('bcryptjs');

router.route('/register')
    .post(async (req, res) => {
        let user = req.body;
        user.password = bcrypt.hashSync(user.password, 20);
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

    });

module.exports = router;