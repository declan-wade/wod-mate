const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment-timezone");

// Define the time zone for the classes
const CLASS_TIME_ZONE = "Asia/Shanghai"; // UTC+8:00

async function createClassesForNext5Days() {
  // Get today's date
  const today = moment().tz(CLASS_TIME_ZONE);

  // Fetch all schedules
  const schedules = await prisma.schedule.findMany();

  // Iterate through each schedule
  for (const schedule of schedules) {
    // Get the days of the week from the schedule
    const daysOfWeek = schedule.day.split(",");

    const date = today.clone().add(5, "days");
    const dayName = date.format("dddd");

    // Check if the current day matches any day in the schedule
    if (daysOfWeek.includes(dayName)) {
      // Create the datetime for the class
      const time = schedule.time;
      const startDateTime = moment
        .tz(`${date.format("YYYY-MM-DD")} ${time}`, CLASS_TIME_ZONE)
        .toDate();

      // Insert the class into the Class table
      await prisma.class.create({
        data: {
          start: startDateTime,
          duration: schedule.duration,
          type: schedule.type,
          notes: schedule.notes,
          capacity: schedule.capacity,
        },
      });
    }
  }
}

// Run the function
createClassesForNext5Days()
  .then(() => {
    console.log(
      `Classes created for ${moment().add(5, "days").format("DD MMM YYYY HH:mm")}`,
    );
  })
  .catch((error) => {
    console.error("Error creating classes:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
