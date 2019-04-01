const router = require('express').Router();
const db = require('../database/helpers/helpers');
const bcrypt = require('bcryptjs');
const { authenticated } = require('../middleware/authMiddleware');

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
                    if(user && bcrypt.compareSync(userData.password, user.password)){
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

router.route('/logout')
    .get(authenticated, async (req, res) => {
        req.session.destroy((err) => {
            if(err){
                res
                    .status(500)
                    .json({ message: 'Failed to log out.' });
            }else{
                res
                    .status(200)
                    .json({ message: 'Successfully logged out' });
            }
        });
    });

module.exports = router;