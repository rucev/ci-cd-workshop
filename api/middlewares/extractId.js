import { errors } from 'common'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

const extractId = (req, res, next) => {
    try {
        const { authorization } = req.headers
        const token = authorization.slice(7)

        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const { sub: userId } = payload

        req.userId = userId
        next()
    } catch (error) {
        next(new errors.AuthError(error.message))
    }
}

export default extractId