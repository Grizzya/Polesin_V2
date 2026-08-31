import jwt from 'jsonwebtoken';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  return secret;
}

export function signToken(payload: string | object | Buffer) {
  // Token expires in 1 day by default
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '1d' });
}

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, getJwtSecret());
    return decoded;
  } catch (error) {
    return null;
  }
}
