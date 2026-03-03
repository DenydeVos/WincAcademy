import { prisma } from "../prismaClient.js";

export async function getAllBookings() {
  return prisma.booking.findMany();
}

export async function getBookingById(id) {
  return prisma.booking.findUnique({ where: { id } });
}

export async function createBooking(data) {
  return prisma.booking.create({ data });
}

export async function updateBooking(id, data) {
  return prisma.booking.update({ where: { id }, data });
}

export async function deleteBooking(id) {
  return prisma.booking.delete({ where: { id } });
}
