const router = require('express').Router();

const users = require('./users');
const auth = require('./auth');

router.use('/', auth);
router.use('/users', users);

module.exports = router;