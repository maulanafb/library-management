import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllCategories = async () => {
  return await prisma.category.findMany();
};

const createCategory = async (data: any) => {
  return await prisma.category.create({
    data,
  });
};

export default {
  getAllCategories,
  createCategory,
};
