import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Book } from "../types";

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Fetch books from the API
    fetch("/api/books")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div>
      <Link to="/books/create" className="btn btn-primary">
        Add Book
      </Link>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Pages</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.pages}</td>
              <td>{book.category.name}</td>
              <td>
                <Link to={`/books/edit/${book.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
