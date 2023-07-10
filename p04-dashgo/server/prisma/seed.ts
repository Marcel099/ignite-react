import { PrismaClient } from '@prisma/client'
import faker from 'faker'

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < 194; i++) {
    await prisma.user.upsert({
      where: { id: i + 1 },
      update: {},
      create: {
        name: `User ${i + 1}`,
        email: faker.internet.email().toLowerCase(),
        createdAt: faker.date.recent(10),
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
