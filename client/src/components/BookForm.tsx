import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Book, Category } from "../types";

const BookForm = () => {
  const [book, setBook] = useState<Partial<Book>>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));

    if (id) {
      fetch(`http://localhost:5000/api/books/${id}`)
        .then((response) => response.json())
        .then((data) => setBook(data));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "categoryId"
        ? parseInt(value, 10)
        : name === "pages"
        ? parseInt(value, 10)
        : value;
    setBook({ ...book, [name]: updatedValue });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!image) {
      return "";
    }

    const formData = new FormData();
    formData.append("coverImage", image);

    const response = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.imageUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";

    const url = id
      ? `http://localhost:5000/api/books/${id}`
      : "http://localhost:5000/api/books";

    let finalImageUrl = book.coverImage || "";
    if (image) {
      finalImageUrl = await uploadImage();
    }

    const bookData = {
      ...book,
      coverImage: finalImageUrl,
    };

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });

    if (response.ok) {
      navigate("/books");
    } else {
      // Handle error
      console.error("Failed to save the book");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <Link
        to="/books"
        className="text-blue-500 mb-4 inline-block rounded shadow-md p-2 hover:bg-blue-500 hover:text-white duration-300"
      >
        ⬅ Back to Books
      </Link>
      <h2 className="text-2xl font-semibold mb-6">
        {id ? "Edit Book" : "Add New Book"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={book.title || ""}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Author</label>
          <input
            type="text"
            name="author"
            value={book.author || ""}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={book.description || ""}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Pages</label>
          <input
            type="number"
            name="pages"
            value={book.pages || 0}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 ${
              id ? "" : "required"
            }`}
            required={id ? false : true}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            name="categoryId"
            value={book.categoryId || ""}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default BookForm;
