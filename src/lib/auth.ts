import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

export function signToken(payload: string | object | Buffer) {
  // Token expires in 1 day by default
  return jwt.sign(payload, JWT_SECRET!, { expiresIn: '1d' });
}

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET!);
    return decoded;
  } catch (error) {
    return null;
  }
}
