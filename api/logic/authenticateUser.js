import { data } from '../data/index.js';
import { errors, validators } from 'common';
import bcrypt from "bcrypt"

/**
 * Verifies the credentials of a user
 * 
 * @param {string} email The user email
 * @param {string} password The user password
 * 
 * @returns {string} User id
 */

export default async (email, password) => {
    validators.validateEmail(email);
    validators.validatePassword(password);

    const user = await data.User.findOne({ email });
    if (!user) throw new errors.ExistenceError('user not found');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new errors.AuthError('wrong credentials');

    return user._id.toString()
}
