import jwt from 'jsonwebtoken'
import { jwtKey } from '../config/config.js'

const jwtAuth = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            error: 'Not authenticated. Please use a JWT at header authorization level'
        })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, jwtKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({
            error: 'Not authorized. Please use a correct JWT at header authorization level'
            })
        }

        next()
    })
}
 
export default jwtAuth