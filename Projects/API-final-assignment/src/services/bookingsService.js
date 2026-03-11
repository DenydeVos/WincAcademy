import { prisma } from "../prismaClient.js";

function buildBookingFilters(query) {
  const where = {};

  if (query.userId) {
    where.userId = query.userId;
  }

  return where;
}

export async function getAllBookings(query = {}) {
  return prisma.booking.findMany({
    where: buildBookingFilters(query),
  });
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
