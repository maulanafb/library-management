export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  pages: number;
  coverImage: string;
  categoryId: number;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  books: Book[];
}
