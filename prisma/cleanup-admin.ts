import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
  // Delete the old plain-text admin user
  const deleted = await prisma.adminUser.deleteMany({
    where: { email: process.env.ADMIN_SEED_EMAIL ?? 'admin@sccassinfosu.org' }
  })
  console.log(`Deleted ${deleted.count} old admin user(s)`)
  await prisma.$disconnect()
}

main()
  .catch(e => {
    console.error('Error:', e)
    process.exit(1)
  })
