import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const username = 'admins'; 
  const plainPassword = 'Molesyuk123!'; 

  const existing = await prisma.admin.findUnique({ where: { username } });
  if (existing) {
    console.log('Admin dengan username ini sudah ada, dibatalkan.');
    return;
  }

  const passwordHash = await bcrypt.hash(plainPassword, 10);

  const admin = await prisma.admin.create({
    data: {
      username,
      passwordHash,
      role: 'admin',
    },
  });

  console.log('Admin berhasil dibuat:', admin.username);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
