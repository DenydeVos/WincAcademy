import { prisma } from "../prismaClient.js";

const propertyInclude = {
  bookings: true,
  reviews: true,
};

export async function getAllProperties() {
  return prisma.property.findMany({
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
