import BookList from "../components/BookList";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Books = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1  bg-gray-100 overflow-hidden">
          <BookList />
        </div>
      </div>
    </div>
  );
};

export default Books;
