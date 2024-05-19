import axios from "axios";
import { Book } from "../types";

const API_URL = "http://localhost:5000/api/books";

export const fetchBooks = async (): Promise<Book[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createBook = async (data: FormData): Promise<void> => {
  console.log(data);
  await axios.post(API_URL, data);
};

export const updateBook = async (id: number, data: FormData): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, data);
};

export const deleteBook = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
