import { prisma } from "../prismaClient.js";

const hostSelectWithoutPassword = {
  id: true,
  username: true,
  name: true,
  email: true,
  phoneNumber: true,
  pictureUrl: true,
  aboutMe: true,
  listings: true,
};

function buildHostFilters(query) {
  const where = {};

  if (query.name) {
    where.name = query.name;
  }

  return where;
}

export async function getAllHosts(query = {}) {
  return prisma.host.findMany({
    where: buildHostFilters(query),
    select: hostSelectWithoutPassword,
  });
}

export async function getHostById(id) {
  return prisma.host.findUnique({ where: { id }, select: hostSelectWithoutPassword });
}

export async function createHost(data) {
  return prisma.host.create({ data, select: hostSelectWithoutPassword });
}

export async function updateHost(id, data) {
  return prisma.host.update({ where: { id }, data, select: hostSelectWithoutPassword });
}

export async function deleteHost(id) {
  return prisma.$transaction(async (tx) => {
    const properties = await tx.property.findMany({ where: { hostId: id }, select: { id: true } });
    const propertyIds = properties.map((property) => property.id);

    if (propertyIds.length > 0) {
      await tx.review.deleteMany({ where: { propertyId: { in: propertyIds } } });
      await tx.booking.deleteMany({ where: { propertyId: { in: propertyIds } } });
      await tx.property.deleteMany({ where: { id: { in: propertyIds } } });
    }

    return tx.host.delete({ where: { id }, select: hostSelectWithoutPassword });
  });
}

export async function findHostForLogin(username) {
  return prisma.host.findUnique({ where: { username } });
}
