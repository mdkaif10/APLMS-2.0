import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create users
  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Student',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Teacher',
    },
  })

  const user3 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      name: 'Bob Wilson',
      email: 'bob@example.com',
      role: 'Student',
    },
  })

  // Create bookings
  const booking1 = await prisma.booking.create({
    data: {
      userId: user1.id,
      date: new Date('2024-03-20'),
      time: '09:00',
      status: 'Active',
    },
  })

  const booking2 = await prisma.booking.create({
    data: {
      userId: user2.id,
      date: new Date('2024-03-21'),
      time: '10:30',
      status: 'Pending',
    },
  })

  const booking3 = await prisma.booking.create({
    data: {
      userId: user1.id,
      date: new Date('2024-03-22'),
      time: '14:00',
      status: 'Completed',
    },
  })

  console.log({ user1, user2, user3, booking1, booking2, booking3 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 