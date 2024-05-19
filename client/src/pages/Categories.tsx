import CategoryList from "../components/CategoryList";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Categories = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-6 bg-gray-100">
          <CategoryList />
        </div>
      </div>
    </div>
  );
};

export default Categories;
