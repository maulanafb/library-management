import { PrismaClient, Book } from "@prisma/client";

const prisma = new PrismaClient();

// beforeAll(async () => {
//     await clearDatabase();
// });
export default async function setup() {
  await seedDatabase();
}

export async function seedDatabase(): Promise<void> {
  const books: Book[] = [
    {
      title: "Book 1",
      author: "Author 1",
      description: "Description 1",
      pages: 100,
      id: 101,
      coverImage: "image1.jpg",
      categoryId: 99,
    },
    {
      title: "Book 2",
      author: "Author 2",
      description: "Description 2",
      pages: 200,
      id: 102,
      coverImage: "image2.jpg",
      categoryId: 100,
    },
  ];
  await prisma.category.createMany({
    data: [
      { name: "Category 1", id: 101 },
      { name: "Category 2", id: 102 },
    ],
  });
  await prisma.book.createMany({
    data: books,
  });

  console.log("Database seeded successfully.");
}

export async function clearDatabase(): Promise<void> {
  await prisma.book.deleteMany();
  await prisma.category.deleteMany();

  console.log("Database cleared successfully.");
}
