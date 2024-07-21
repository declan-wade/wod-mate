const { PrismaClient } = require("@prisma/client");
const faker = require("faker");

const prisma = new PrismaClient();

async function main() {
  // Generate fake data
  const classes = Array.from({ length: 10 }).map(() => ({
    start: faker.date.future(),
    duration: `${faker.random.number({ min: 1, max: 4 })} hours`,
    type: faker.random.arrayElement([
      "Yoga",
      "Pilates",
      "Spinning",
      "Zumba",
      "CrossFit",
    ]),
    description: faker.lorem.sentence(),
    notes: faker.lorem.sentences(),
    attendees: faker.random.number({ min: 5, max: 30 }),
  }));

  // Insert data into the Class table
  for (const classData of classes) {
    await prisma.class.create({
      data: classData,
    });
  }

  console.log("Fake data inserted into the Class table");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
