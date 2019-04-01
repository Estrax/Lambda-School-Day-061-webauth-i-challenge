const router = require('express').Router();

const users = require('./users');
const auth = require('./auth');
const restricted = require('./restricted');

router.use('/', auth);
router.use('/users', users);
router.use('/restricted', restricted);

router.route('/')
    .get(async (req, res) => {
        res.json({
            message: "API works"
        });
    });

module.exports = router;