import logic from '../../logic/index.js';

/**
 * Route handler to retrieve information of a user.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 */
export default async (req, res, next) => {
    const userId = req.userId;

    try {
        const user = await logic.retrieveUser(userId)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}