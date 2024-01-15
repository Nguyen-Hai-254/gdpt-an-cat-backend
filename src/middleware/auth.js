require('dotenv').config()
import jwt from "jsonwebtoken"

const tokenFromHeader = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer' && req.headers.authorization.split(' ')[1]) {
        return req.headers.authorization.split(' ')[1]
    }
    return null
}

export const verifyToken = async (req, res, next) => {
    let key = process.env.JWT_PRIVATEKEY;
    try {
        if (tokenFromHeader(req)) {
            let decoded = jwt.verify(tokenFromHeader(req), key);
            if (decoded && decoded.userId && decoded.email && decoded.role) {
                req.user = { userId: decoded.userId, email: decoded.email, role: decoded.role };
                next()
            }
            else {
                return res.status(403).json('You are not authorized to do this')
            }
        }
        else {
            return res.status(401).json('Token is valid',)
        }

    } catch (e) {
        return res.status(500).json(e.message)
    }


}