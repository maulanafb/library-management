import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Category } from "../types";

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const handleDelete = (id: number) => {
    setDeleteCategoryId(id);
  };

  const handleConfirmDelete = async () => {
    if (!deleteCategoryId) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${deleteCategoryId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Jika berhasil, hapus kategori dari daftar
        setCategories(
          categories.filter((category) => category.id !== deleteCategoryId)
        );
      } else {
        // Tangani kesalahan dari respons
        const responseData = await response.json();
        throw new Error(responseData.error);
      }
    } catch (error: any) {
      console.error("Error deleting category:", error);
      // Tampilkan pesan kesalahan
      setErrorMessage(error.message);
    } finally {
      // Setel kembali `deleteCategoryId` ke `null`
      setDeleteCategoryId(null);
    }
  };

  const handleCloseErrorModal = () => {
    setErrorMessage(null); // Sembunyikan pesan kesalahan
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <Link
          to="/categories/create"
          className="bg-[#1f2937] text-white px-4 py-2 rounded-md hover:bg-blue-900"
        >
          Add Category
        </Link>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-b border-gray-200">
              <td className="px-4 py-2">{category.name}</td>
              <td className="px-4 py-2">
                <Link
                  to={`/categories/edit/${category.id}`}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Error Modal */}
      {errorMessage && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center duration-300">
          <div className="bg-white p-8 rounded-lg w-96">
            <p className="text-red-600 mb-4">
              Category cannot be deleted because it is associated with books 😁
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleCloseErrorModal}
                className="bg-gray-700 hover:bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCategoryId !== null && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center duration-300">
          <div className="bg-white p-8 rounded-lg w-96">
            <p className="mb-4">
              Are you sure you want to delete this category?
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Yes
              </button>
              <button
                onClick={() => setDeleteCategoryId(null)}
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

export default CategoryList;
