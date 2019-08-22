const router = require('express').Router();

router.route('/*')
    .get(async (req, res) => {
        await res
                .status(200)
                .json({
                    message: `This is the ${req.originalUrl} route`
                });
    });

module.exports = router;