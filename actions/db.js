"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import moment from "moment";

export async function createClass(values) {
  try {
    const response = await prisma.class.create({
      data: {
        start: values.classDate,
        duration: values.duration,
        type: values.classType,
        capacity: values.capacity,
        notes: values?.notes,
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating class:", error);
    throw error;
  }
}

export async function getClasses() {
  try {
    const response = await prisma.class.findMany({});
    return response;
  } catch (error) {
    console.error("Error creating class:", error);
    throw error;
  }
}

export async function createSchedule(values) {
  try {
    const response = await prisma.schedule.create({
      data: {
        time: `${moment(values.time).format("HH:mm")}`,
        day: `${values.days}`,
        duration: values.duration,
        type: values.classType,
        capacity: values.capacity,
        notes: values?.notes,
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating schedule:", error);
    throw error;
  }
}
