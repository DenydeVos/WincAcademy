/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function readJson(relativePath) {
  const absPath = path.join(__dirname, "..", relativePath);
  const raw = fs.readFileSync(absPath, "utf-8");
  return JSON.parse(raw);
}

async function main() {
  const usersJson = readJson("src/data/users.json");
  const hostsJson = readJson("src/data/hosts.json");
  const propertiesJson = readJson("src/data/properties.json");
  const bookingsJson = readJson("src/data/bookings.json");
  const reviewsJson = readJson("src/data/reviews.json");

  const users = usersJson.users || [];
  const hosts = hostsJson.hosts || [];
  const properties = propertiesJson.properties || [];
  const bookings = (bookingsJson.bookings || []).map((b) => ({
    ...b,
    checkinDate: new Date(b.checkinDate),
    checkoutDate: new Date(b.checkoutoutDate || b.checkoutDate),
  }));
  const reviews = reviewsJson.reviews || [];

  // Insert in dependency order: Hosts -> Properties -> Users -> Bookings/Reviews
  // Using create (not createMany) keeps compatibility with older Prisma feature sets.
  for (const h of hosts) {
    await prisma.host.create({ data: h });
  }
  for (const p of properties) {
    await prisma.property.create({ data: p });
  }
  for (const u of users) {
    await prisma.user.create({ data: u });
  }
  for (const b of bookings) {
    await prisma.booking.create({ data: b });
  }
  for (const r of reviews) {
    await prisma.review.create({ data: r });
  }

  console.log("✅ Database seeded");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
