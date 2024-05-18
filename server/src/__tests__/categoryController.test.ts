// src/__tests__/categoryController.test.ts
import request from "supertest";
import app from "../app";
import { prismaMock } from "./prismaMock";

describe("Category Controller", () => {
  it("should return all categories", async () => {
    const categories = [
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
    ];

    prismaMock.category.findMany.mockResolvedValue(categories);

    const res = await request(app).get("/api/categories");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(categories);
  });

  it("should create a new category", async () => {
    const newCategory = { name: "Category 1" };

    prismaMock.category.create.mockResolvedValue({ id: 1, ...newCategory });

    const res = await request(app).post("/api/categories").send(newCategory);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 1, ...newCategory });
  });
});
