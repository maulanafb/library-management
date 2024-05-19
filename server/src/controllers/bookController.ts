import { Request, Response } from "express";
import bookService from "../services/bookService";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await bookService.getBookById(Number(req.params.id));
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await bookService.createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await bookService.updateBook(Number(req.params.id), req.body);
    res.json(book);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    await bookService.deleteBook(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
