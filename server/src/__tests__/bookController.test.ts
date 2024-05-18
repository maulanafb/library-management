// src/__tests__/bookController.test.ts
import request from "supertest";
import app from "../app";
import { prismaMock } from "./prismaMock";

describe("Book Controller", () => {
  it("should return all books", async () => {
    const books = [
      {
        id: 1,
        title: "Book 1",
        author: "Author 1",
        description: "Description 1",
        pages: 100,
        coverImage: "image1.jpg",
        categoryId: 1,
      },
      {
        id: 2,
        title: "Book 2",
        author: "Author 2",
        description: "Description 2",
        pages: 200,
        coverImage: "image2.jpg",
        categoryId: 2,
      },
    ];

    prismaMock.book.findMany.mockResolvedValue(books);

    const res = await request(app).get("/api/books");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(books);
  });

  it("should return a book by id", async () => {
    const book = {
      id: 1,
      title: "Book 1",
      author: "Author 1",
      description: "Description 1",
      pages: 100,
      coverImage: "image1.jpg",
      categoryId: 1,
    };

    prismaMock.book.findUnique.mockResolvedValue(book);

    const res = await request(app).get("/api/books/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(book);
  });

  it("should create a new book", async () => {
    const newBook = {
      title: "Book 1",
      author: "Author 1",
      description: "Description 1",
      pages: 100,
      coverImage: "image1.jpg",
      categoryId: 1,
    };

    prismaMock.book.create.mockResolvedValue({ id: 1, ...newBook });

    const res = await request(app).post("/api/books").send(newBook);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 1, ...newBook });
  });

  it("should update a book", async () => {
    const updatedBook = {
      title: "Updated Book 1",
      author: "Author 1",
      description: "Description 1",
      pages: 100,
      coverImage: "image1.jpg",
      categoryId: 1,
    };

    prismaMock.book.update.mockResolvedValue({ id: 1, ...updatedBook });

    const res = await request(app).put("/api/books/1").send(updatedBook);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, ...updatedBook });
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

    const res = await request(app).delete("/api/books/1");

    expect(res.status).toBe(204);
  });
});
