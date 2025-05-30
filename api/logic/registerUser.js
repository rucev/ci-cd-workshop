import { data } from '../data/index.js';
import { errors, validators } from 'common';
import bcrypt from "bcrypt"

/**
 * Creates a new user
 * 
 * @param {string} email The user email
 * @param {string} password The user password
 */

export default async (email, password) => {
    validators.validateEmail(email);
    validators.validatePassword(password);

    try {
        const cryptPassword = await bcrypt.hash(password, 10);

        await data.User.create({
            email,
            password: cryptPassword,
        });

    } catch (error) {
        if (error.message.includes('E11000'))
            throw new errors.DuplicityError(`user with email ${email} already exists`)

        throw new errors.UnknownError(error.message)
    }
}