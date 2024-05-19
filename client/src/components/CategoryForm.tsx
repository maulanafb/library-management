import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Category } from "../types";

const CategoryForm = () => {
  const [category, setCategory] = useState<Partial<Category>>({});
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/categories/${id}`)
        .then((response) => response.json())
        .then((data) => setCategory(data));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:5000/api/categories/${id}`
      : "http://localhost:5000/api/categories";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    }).then(() => navigate("/categories"));
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <Link
        to="/categories"
        className="text-blue-500 mb-4 inline-block rounded shadow-md p-2 hover:bg-blue-500 hover:text-white duration-300"
      >
        ⬅ Back to Categories
      </Link>
      <h2 className="text-2xl font-semibold mb-6">
        {id ? "Edit Category" : "Add New Category"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={category.name || ""}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2"
            required
          />
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

export default CategoryForm;
