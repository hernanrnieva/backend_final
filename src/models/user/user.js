import jwt from 'jsonwebtoken'
import { jwtKey } from '../../controllers/config/config.js'
import { jwtExpiration } from '../../controllers/config/config.js'

const generateToken = (user) => {
    const token = jwt.sign({ 
        data: {
            email: user.id,
            password: user.password
        }
    },
        jwtKey,
        { expiresIn: jwtExpiration}
    )

    return token
}

const userModel = {
    getJwt: (user) => {
        return generateToken(user)
    }
}

export default userModel