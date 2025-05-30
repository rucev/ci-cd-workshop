import { data } from '../data/index.js';
import { errors, validators } from 'common';

/**
 * Retrieve's a user display data
 * 
 * @param {string} userId The user id
 * 
 * @returns {string} user email
 */

export default async (userId) => {
    validators.validateId(userId, 'userId');

    const user = await data.User.findById(userId, 'email').lean();
    if (!user) throw new errors.ExistenceError('user not found');

    return user.email;
}