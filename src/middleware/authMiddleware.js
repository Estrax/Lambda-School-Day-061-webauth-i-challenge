module.exports = {
    authenticated,
    restricted
};

async function authenticated(req, res, next){
    if(!req.session || !req.session.userID){
        return res
            .status(400)
            .json({ message: 'You shall not pass!' });
    }
    next();
}

async function restricted(req, res, next){
    if(req.originalUrl.indexOf('/api/restricted/') === 0){
        return next(authenticated(req, res, next));
    }
    next();
}