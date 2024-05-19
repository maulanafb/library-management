import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Dashboard = () => {
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books");
        const data = await response.json();
        setTotalBooks(data.length);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        const data = await response.json();
        setTotalCategories(data.length);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchBooks();
    fetchCategories();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-6 bg-gray-100">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome to the Library Management Dashboard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Total Books</h3>
              <p className="mt-4 text-4xl font-bold">{totalBooks}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Total Categories</h3>
              <p className="mt-4 text-4xl font-bold">{totalCategories}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
