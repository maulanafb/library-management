// jest.setup.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fungsi setup Jest untuk menghapus data sebelum setiap tes
export default async () => {
  await prisma.book.deleteMany({});
  await prisma.category.deleteMany({});
};
