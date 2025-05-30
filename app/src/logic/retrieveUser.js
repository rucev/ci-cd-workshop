import { errors } from 'common';
import context from './context'

/**
 * Retrieve's the data of an user by the token
 * 
 * @returns a user email
*/

export default async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${context.token}`
    }
  });

  if (response.status !== 200) {
    const body = await response.json();
    throw new errors[body.name](body.message)
  }

  return await response.json();
};

