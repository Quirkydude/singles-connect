import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
  try {
    // Create Registration table
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Registration" (
        id TEXT PRIMARY KEY,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "firstName" TEXT NOT NULL,
        "lastName" TEXT NOT NULL,
        "middleName" TEXT,
        gender TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT NOT NULL,
        "participantType" TEXT NOT NULL,
        title TEXT,
        designation TEXT,
        "isNonCOP" BOOLEAN NOT NULL DEFAULT FALSE,
        region TEXT NOT NULL DEFAULT 'Central',
        area TEXT NOT NULL DEFAULT 'Assin Fosu',
        venue TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        "confirmationRef" TEXT UNIQUE,
        notes TEXT
      )
    `
    console.log('✓ Registration table created (or already exists)')
  } catch (e: any) {
    console.error('Registration table error:', e.message)
  }

  try {
    // Create AdminUser table
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "AdminUser" (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        "passwordHash" TEXT NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log('✓ AdminUser table created (or already exists)')
  } catch (e: any) {
    console.error('AdminUser table error:', e.message)
  }

  // Now seed the admin user
  const email = process.env.ADMIN_SEED_EMAIL ?? 'admin@sccassinfosu.org'
  const password = process.env.ADMIN_SEED_PASSWORD ?? 'Admin@SCC2026!'
  const passwordHash = await bcrypt.hash(password, 12)

  try {
    const existing = await prisma.adminUser.findUnique({ where: { email } })
    if (existing) {
      console.log(`✓ Admin user already exists: ${email}`)
    } else {
      console.log(`Creating admin user: ${email}`)
      const user = await prisma.adminUser.create({
        data: { email, passwordHash }
      })
      console.log(`✓ Admin user created: ${email}`)
    }
  } catch (e: any) {
    console.error('Admin seed error:', e.message)
  }

  await prisma.$disconnect()
}

main()
  .catch(e => {
    console.error('Fatal error:', e)
    process.exit(1)
  })
