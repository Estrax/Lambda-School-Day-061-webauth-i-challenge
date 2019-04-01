const router = require('express').Router();

const users = require('./users');
const auth = require('./auth');

router.use('/', auth);
router.use('/users', users);

router.route('/')
    .get(async (req, res) => {
        res.json({
            message: "API works"
        });
    });

module.exports = router;