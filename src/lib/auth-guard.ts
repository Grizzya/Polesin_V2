import { cookies } from 'next/headers';
import { verifyToken } from './auth';

export interface AdminPayload {
  id: string;
  username: string;
  role: string;
}

/**
 * Validates the admin session cookie and returns the admin payload.
 * Useful for Server Actions to ensure the user is genuinely authenticated.
 * Returns null if missing or invalid.
 */
export async function getAuthenticatedAdmin(): Promise<AdminPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) {
    return null;
  }

  // verifyToken returns the payload if valid, otherwise null
  const payload = verifyToken(token) as any;
  if (!payload || !payload.id) {
    return null;
  }

  return {
    id: payload.id,
    username: payload.username,
    role: payload.role,
  };
}
