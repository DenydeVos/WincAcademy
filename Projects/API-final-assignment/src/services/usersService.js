import { prisma } from "../prismaClient.js";

const userSelectWithoutPassword = {
  id: true,
  username: true,
  name: true,
  email: true,
  phoneNumber: true,
  pictureUrl: true,
};

export async function getAllUsers() {
  return prisma.user.findMany({ select: userSelectWithoutPassword });
}

export async function getUserById(id) {
  return prisma.user.findUnique({ where: { id }, select: userSelectWithoutPassword });
}

export async function createUser(data) {
  return prisma.user.create({ data, select: userSelectWithoutPassword });
}

export async function updateUser(id, data) {
  return prisma.user.update({ where: { id }, data, select: userSelectWithoutPassword });
}

export async function deleteUser(id) {
  // delete dependent rows first
  return prisma.$transaction(async (tx) => {
    await tx.review.deleteMany({ where: { userId: id } });
    await tx.booking.deleteMany({ where: { userId: id } });
    return tx.user.delete({ where: { id }, select: userSelectWithoutPassword });
  });
}

export async function findUserForLogin(username) {
  return prisma.user.findUnique({ where: { username } });
}
