import { errors, validators } from 'common';

const { validateEmail, validateRepeatPassword } = validators;

/**
 * Creates a user by mail, username and password. Adds the rest of the info.
 * 
 * @param {string} email The new user's email
 * @param {string} password The new user's password
 * @param {string} repeatPassword The confirmation password
 * 
 */

export default async (email, password, repeatPassword) => {
  validateEmail(email);
  validateRepeatPassword(password, repeatPassword);

  const user = { email, password, repeatPassword };

  const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(user)
  });

  if (response.status !== 204) {
    const body = await response.json();
    throw new errors[body.name](body.message)
  }
};





