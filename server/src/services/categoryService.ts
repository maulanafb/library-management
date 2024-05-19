import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllCategories = async () => {
  return await prisma.category.findMany();
};

const getCategoryById = async (id: number) => {
  return await prisma.category.findUnique({
    where: { id },
  });
};

const createCategory = async (data: any) => {
  return await prisma.category.create({
    data,
  });
};

const updateCategory = async (id: number, data: any) => {
  return await prisma.category.update({
    where: { id },
    data,
  });
};

const deleteCategory = async (id: number) => {
  return await prisma.category.delete({
    where: { id },
  });
};

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
