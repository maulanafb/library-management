import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Book } from "../types";

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [deleteBookId, setDeleteBookId] = useState<number | null>(null);

  useEffect(() => {
    // Fetch books from the API
    fetch("http://localhost:5000/api/books")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  const handleDelete = async (id: number) => {
    setDeleteBookId(id);
  };

  const handleConfirmDelete = async () => {
    if (!deleteBookId) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/books/${deleteBookId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setBooks(books.filter((book) => book.id !== deleteBookId));
        console.log(`Book with id ${deleteBookId} deleted successfully`);
      } else {
        console.error("Failed to delete book");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setDeleteBookId(null);
    }
  };

  const handleCloseModal = () => {
    setDeleteBookId(null);
  };

  return (
    <div className="h-full overflow-y-scroll p-6">
      <Link
        to="/books/create"
        className="px-4 py-2 bg-gray-900 mb-4 text-white rounded-md hover:bg-gray-700"
      >
        Add Book
      </Link>
      {books.length === 0 ? (
        <div className="flex justify-center mt-[200px] h-full">
          <p className="text-gray-500 font-semibold text-[40px]">
            Book Not Found 😥
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={`http://localhost:5000${book.coverImage}`}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{book.title}</h2>
                <p className="text-gray-600">by {book.author}</p>
                <p className="mt-2">Pages: {book.pages}</p>
                <p className="mt-2">Category: {book.category.name}</p>
                <div className="mt-4 flex justify-between">
                  <Link
                    to={`/books/edit/${book.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Modal */}
      {deleteBookId && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center duration-300">
          <div className="bg-white p-8 rounded-lg w-96">
            <p className="mb-4">Are you sure you want to delete this book?</p>
            <div className="flex justify-end">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Yes
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
