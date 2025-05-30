import logic from '../../logic/index.js';
import jwt from 'jsonwebtoken'

/**
 * Route handler for authenticate a user and returns a JSON Web Token (JWT) upon successful authentication.
 * 
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 */
export default async (req, res, next) => {
    const { email, password } = req.body

    try {
        const userId = await logic.authenticateUser(email, password)
        const payload = { sub: userId };

        const { JWT_SECRET, JWT_EXPIRATION } = process.env;
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

        res.status(200).json(token);
    } catch (error) {
        next(error)
    }
}