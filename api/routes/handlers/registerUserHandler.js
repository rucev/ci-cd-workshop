import logic from '../../logic/index.js';

/**
 * Route handler for registering a new user.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 */
export default async (req, res, next) => {
    const { email, password } = req.body

    try {
        await logic.registerUser(email, password)
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}
