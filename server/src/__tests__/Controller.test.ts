import request from "supertest";
import app from "../app";
import { prismaMock } from "./prismaMock";

describe("Category Controller", () => {
  it("should create new categories", async () => {
    // Persiapkan data untuk dua kategori
    const newCategory1 = { id: 1, name: "Category 1" };
    const newCategory2 = { id: 2, name: "Category 2" };

    // Mock respons dari Prisma untuk pembuatan kategori pertama
    prismaMock.category.create.mockResolvedValueOnce({
      ...newCategory1,
    });

    // Kirim permintaan untuk membuat kategori pertama
    const res1 = await request(app).post("/api/categories").send(newCategory1);

    // Periksa apakah pembuatan kategori pertama berhasil
    expect(res1.status).toBe(201);
    expect(res1.body).toEqual({
      ...newCategory1,
    });

    // Mock respons dari Prisma untuk pembuatan kategori kedua
    prismaMock.category.create.mockResolvedValueOnce({
      ...newCategory2,
    });

    // Kirim permintaan untuk membuat kategori kedua
    const res2 = await request(app).post("/api/categories").send(newCategory2);

    // Periksa apakah pembuatan kategori kedua berhasil
    expect(res2.status).toBe(201);
    expect(res2.body).toEqual({
      ...newCategory2,
    });
  });

  it("should return all categories", async () => {
    const categories = [{ id: 1, name: "Category 1" }];

    prismaMock.category.findMany.mockResolvedValue(categories);

    const res = await request(app).get("/api/categories");

    console.log("Response Body:", res.body); // Debugging log

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
    ]);
  });
});

describe("Book Controller", () => {
  it("should create two new books", async () => {
    const newBook1 = {
      id: 1,
      title: "New Book 1",
      author: "New Author 1",
      description: "New Description 1",
      pages: 123,
      coverImage: "new_image1.jpg",
      categoryId: 1,
    };

    const newBook2 = {
      id: 2,
      title: "New Book 2",
      author: "New Author 2",
      description: "New Description 2",
      pages: 456,
      coverImage: "new_image2.jpg",
      categoryId: 2,
    };

    prismaMock.book.create.mockResolvedValueOnce({
      ...newBook1,
    });

    prismaMock.book.create.mockResolvedValueOnce({
      ...newBook2,
    });

    const res1 = await request(app).post("/api/books").send(newBook1);
    console.log("Response Status for Book 1:", res1.status); // Debugging log
    console.log("Response Body for Book 1:", res1.body); // Debugging log

    expect(res1.status).toBe(201);
    expect(res1.body).toEqual({
      ...newBook1,
    });

    const res2 = await request(app).post("/api/books").send(newBook2);
    console.log("Response Status for Book 2:", res2.status); // Debugging log
    console.log("Response Body for Book 2:", res2.body); // Debugging log

    expect(res2.status).toBe(201);
    expect(res2.body).toEqual({
      ...newBook2,
    });
  });
  it("should return all books", async () => {
    const books = [
      {
        id: 1,
        title: "New Book 1",
        author: "New Author 1",
        description: "New Description 1",
        pages: 123,
        coverImage: "new_image1.jpg",
        categoryId: 1,
        category: { id: 1, name: "Category 1" },
      },
      {
        id: 2,
        title: "New Book 2",
        author: "New Author 2",
        description: "New Description 2",
        pages: 456,
        coverImage: "new_image2.jpg",
        categoryId: 2,
        category: { id: 2, name: "Category 2" },
      },
    ];

    prismaMock.book.findMany.mockResolvedValue(books);

    const res = await request(app).get("/api/books");

    console.log("Response Body:", res.body); // Debugging log

    expect(res.status).toBe(200);
    expect(res.body).toEqual(books);
  });

  it("should return a book by id", async () => {
    const book = {
      id: 1,
      title: "New Book 1",
      author: "New Author 1",
      description: "New Description 1",
      pages: 123,
      coverImage: "new_image1.jpg",
      categoryId: 1,
      category: { id: 1, name: "Category 1" },
    };

    prismaMock.book.findUnique.mockResolvedValue(book);

    const res = await request(app).get("/api/books/1");

    console.log("Response Status:", res.status); // Debugging log
    console.log("Response Body:", res.body); // Debugging log

    expect(res.status).toBe(200);
    expect(res.body).toEqual(book);
  });

  it("should update a book", async () => {
    const updatedBook = {
      id: 1,
      title: "Updated Book",
      author: "Updated Author",
      description: "Updated Description",
      pages: 200,
      coverImage: "updated_image.jpg",
      categoryId: 1,
    };

    prismaMock.book.update.mockResolvedValue(updatedBook);

    const res = await request(app).put("/api/books/1").send(updatedBook);

    console.log("Response Status:", res.status); // Debugging log
    console.log("Response Body:", res.body); // Debugging log

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedBook);
  });

  it("should delete a book", async () => {
    prismaMock.book.delete.mockResolvedValue({
      id: 1,
      title: "Book 1",
      author: "Author 1",
      description: "Description 1",
      pages: 100,
      coverImage: "image1.jpg",
      categoryId: 1,
    });

    const res = await request(app).delete("/api/books/2");

    console.log("Response Status:", res.status); // Debugging log
    console.log("Response Body:", res.body); // Debugging log

    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
  });
});
