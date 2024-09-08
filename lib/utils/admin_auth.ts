import { NextRequest } from 'next/server';

export async function isAuthenticated(req: NextRequest) {
  const authHeader =
    req.headers.get('authorization') || req.headers.get('Authorization');

  if (authHeader == null) return false;

  const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64')
    .toString()
    .split(':');

  return (
    username === process.env.ADMIN_USERNAME &&
    (await isValidPassword(
      password,
      process.env.HASHED_ADMIN_PASSWORD as string
    ))
  );
}

export const isValidPassword = async (
  password: string,
  hashedPassword: string
) => {
  const arrayBuffer = await crypto.subtle.digest(
    'SHA-512',
    new TextEncoder().encode(password)
  );

  const bufferPassword = Buffer.from(arrayBuffer).toString('base64');

  return bufferPassword === hashedPassword;
};
