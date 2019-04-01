module.exports = {
    authenticated
};

async function authenticated(req, res, next){
    if(!req.session || !req.session.userID){
        return res
            .status(400)
            .json({ message: 'Access denied.' });
    }
    next();
}