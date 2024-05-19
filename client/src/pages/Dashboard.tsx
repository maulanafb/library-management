import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Dashboard = () => {
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
              <p className="mt-4 text-4xl font-bold">123</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Total Categories</h3>
              <p className="mt-4 text-4xl font-bold">12</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Recent Activity</h3>
              <p className="mt-4">Added new book "React for Beginners"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
