import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const username = process.env.ADMIN_SEED_USERNAME;
  const plainPassword = process.env.ADMIN_SEED_PASSWORD;

  if (!username || !plainPassword) {
    console.error('Error: Harap setel environment variable ADMIN_SEED_USERNAME dan ADMIN_SEED_PASSWORD sebelum menjalankan script ini.');
    process.exit(1);
  }

  const existing = await prisma.admin.findUnique({ where: { username } });
  if (existing) {
    console.log(`Admin dengan username "${username}" sudah ada, dibatalkan.`);
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
