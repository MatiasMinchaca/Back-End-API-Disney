const jwt = require('jsonwebtoken');
const {jsonToken} = require('../../config/index')
function verifyToken (req, res, next){
    const token = req.headers['authorization'];
    if (!token){
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        })
    }
    try {
        const decoded = jwt.verify(token, jsonToken.token);
        req.userId = decoded.id
    } catch (err) {
        return res.status(401).json({
            auth: false,
            message: 'Invalid token'
        })
    }
    next()
}
module.exports = verifyToken;