import { prisma } from "../prismaClient.js";

const propertyInclude = {
  bookings: true,
  reviews: true,
};

function buildPropertyFilters(query) {
  const where = {};

  if (query.location) {
    where.location = query.location;
  }

  if (query.pricePerNight !== undefined) {
    const pricePerNight = Number(query.pricePerNight);

    if (!Number.isNaN(pricePerNight)) {
      where.pricePerNight = pricePerNight;
    }
  }

  return where;
}

export async function getAllProperties(query = {}) {
  return prisma.property.findMany({
    where: buildPropertyFilters(query),
    include: propertyInclude,
  });
}

export async function getPropertyById(id) {
  return prisma.property.findUnique({
    where: { id },
    include: propertyInclude,
  });
}

export async function createProperty(data) {
  return prisma.property.create({
    data,
    include: propertyInclude,
  });
}

export async function updateProperty(id, data) {
  return prisma.property.update({
    where: { id },
    data,
    include: propertyInclude,
  });
}

export async function deleteProperty(id) {
  return prisma.$transaction(async (tx) => {
    await tx.review.deleteMany({ where: { propertyId: id } });
    await tx.booking.deleteMany({ where: { propertyId: id } });
    return tx.property.delete({
      where: { id },
      include: propertyInclude,
    });
  });
}
