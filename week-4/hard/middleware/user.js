const jwt = require('jsonwebtoken');
function userMiddleware(req, res, next) {
    // Implement user auth logic
    const jwtSecret = process.env.JWT_SECRET;
    try{
        const token = req.headers.authorization;
        let user = jwt.verify(token,jwtSecret);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json("Incorrect token provided");
    }
}

module.exports = userMiddleware;