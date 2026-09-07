'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAdmin(prevState: any, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Username dan password wajib diisi.' };
  }

  const headersList = await headers();
  const rawIp = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'Unknown';
  // If multiple IPs are in x-forwarded-for, take the first (client) IP
  const ipAddress = rawIp.split(',')[0].trim();

  try {
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    const failedAttempts = await prisma.auditLog.count({
      where: {
        action: 'login_failed',
        createdAt: { gte: fifteenMinutesAgo },
        OR: [
          { ipAddress },
          { description: { contains: username } }
        ]
      }
    });

    if (failedAttempts >= 5) {
      return { error: 'Terlalu banyak percobaan login gagal. Akun/IP dibatasi sementara selama 15 menit.' };
    }

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      await prisma.auditLog.create({
        data: {
          action: 'login_failed',
          target: 'System',
          description: `Failed login attempt for username: ${username}`,
          ipAddress,
        }
      });
      return { error: 'Username atau password salah.' };
    }

    const isValidPassword = await bcrypt.compare(password, admin.passwordHash);

    if (!isValidPassword) {
      await prisma.auditLog.create({
        data: {
          adminId: admin.id,
          action: 'login_failed',
          target: 'System',
          description: `Failed login attempt for username: ${username} (invalid password)`,
          ipAddress,
        }
      });
      return { error: 'Username atau password salah.' };
    }

    const token = signToken({ 
      id: admin.id, 
      username: admin.username, 
      role: admin.role 
    });

    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, 
    });

    await prisma.auditLog.create({
      data: {
        adminId: admin.id,
        action: 'login',
        target: 'System',
        description: 'Admin logged in successfully',
        ipAddress: ipAddress,
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Terjadi kesalahan pada server.' };
  }

  // Redirect harus diluar blok try-catch karena dia me-throw error spesifik Next.js
  redirect('/admin/dashboard');
}
