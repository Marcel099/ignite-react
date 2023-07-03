import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.transaction.createMany({
    data: [
      {
        title: 'Freelance de website',
        type: 'deposit',
        category: 'Dev',
        amount: 6000,
      },
      {
        title: 'Aluguel',
        type: 'withdraw',
        category: 'Casa',
        amount: 1100,
      }
    ]
  })
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