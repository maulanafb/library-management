import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Categories from "./pages/Categories";
import BookForm from "./components/BookForm";
import CategoryForm from "./components/CategoryForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/books/create" element={<BookForm />} />
      <Route path="/books/edit/:id" element={<BookForm />} />
      <Route path="/books" element={<Books />} />
      <Route path="/categories/create" element={<CategoryForm />} />
      <Route path="/categories/edit/:id" element={<CategoryForm />} />
      <Route path="/categories" element={<Categories />} />
    </Routes>
  );
};

export default App;
