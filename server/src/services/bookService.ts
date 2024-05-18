import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllBooks = async () => {
  return await prisma.book.findMany({
    include: {
      category: true,
    },
  });
};

const getBookById = async (id: number) => {
  return await prisma.book.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
};

const createBook = async (data: any) => {
  return await prisma.book.create({
    data,
  });
};

const updateBook = async (id: number, data: any) => {
  return await prisma.book.update({
    where: { id },
    data,
  });
};

const deleteBook = async (id: number) => {
  return await prisma.book.delete({
    where: { id },
  });
};

export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
