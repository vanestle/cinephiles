const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']

    // Token check
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    // Verifying token
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' })
    }
}

module.exports = authenticateToken