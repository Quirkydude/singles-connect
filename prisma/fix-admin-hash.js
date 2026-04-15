const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv/config');

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL ?? 'admin@sccassinfosu.org';
  const password = process.env.ADMIN_SEED_PASSWORD ?? 'Admin@SCC2026!';
  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const updated = await prisma.adminUser.updateMany({
      where: { email },
      data: { passwordHash }
    });
    console.log(`✓ Updated ${updated.count} admin user(s) with hashed password`);
  } catch (e) {
    console.error('Update error:', e.message);
  }

  await prisma.$disconnect();
}

main()
  .catch(e => {
    console.error('Error:', e);
    process.exit(1);
  });
