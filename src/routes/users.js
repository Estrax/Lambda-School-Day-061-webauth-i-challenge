const router = require('express').Router();
const db = require('../database/helpers/helpers');
const { authenticated } = require('../middleware/authMiddleware');

router.route('/')
    .get(authenticated, async (req, res) => {
        await db
                .getUsers()
                .then(users => {
                    res
                        .status(200)
                        .json(users);
                })
                .catch(err => {
                    res
                        .status(404)
                        .json({ message: 'You shall not pass!' });
                });
    });

module.exports = router;