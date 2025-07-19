import { useState } from "react";
import { order } from "../types";
import Orders from "../components/Orders";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../api/service/orderapi";
import SearchBar from "../components/reusable/SearchBar";
import Paginator from "../components/reusable/Paginator";
import { useQuery } from "@tanstack/react-query";

const Store: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchQuery, setQuery] = useState("");
  const limit = 6;

  //  Pure function to fetch orders (no setState)
  const fetchOrders = async (query: string, page: number, limit: number) => {
    const response = await getOrders({ query, page, limit });
    return response.data.data; // should contain orders and totalPages
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["orders", searchQuery, page], // Unique key that changes with search or page to trigger refetch
    queryFn: () => fetchOrders(searchQuery, page, limit), // Function to fetch orders based on search and page
    staleTime: 5000, // Keep data fresh for 5 seconds before allowing background refetch
    refetchOnMount: false, // Don't refetch data when component remounts
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnReconnect: false, // Don't refetch when internet reconnects
    placeholderData: (prevData) => prevData, // Show previous data while new data is loading
  });

  const setPagination = (number: number) => {
    setPage(number);
  };

  const applyFilter = (search: string) => {
    setQuery(search);
    setPage(1);
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <nav className="text-sm text-gray-600 mb-2" aria-label="Breadcrumb">
          <ol className="list-reset flex items-center">
            <li>
              <button
                onClick={() => navigate("/")}
                className="text-blue-600 hover:underline"
              >
                Home
              </button>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-500">Orders</li>
          </ol>
        </nav>
      </div>

      <div className="relative mb-4 flex justify-center items-center">
        <SearchBar placeholder="Search all orders..." onSearch={applyFilter} />
      </div>

      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {isLoading ? (
        <p className="text-center">Loading orders...</p>
      ) : error ? (
        <p className="text-center text-red-500">Failed to load orders.</p>
      ) : (
        <>
          <div className="space-y-6">
            {data?.orders?.map((order: order) => (
              <div
                key={order._id}
                className="border rounded-lg shadow-md p-4 bg-white"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-lg font-semibold text-gray-700">
                      Order ID:{" "}
                      <span className="text-blue-600">{order._id}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Date: {new Date(order.orderedDate).toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.products.map((item) => (
                    <Orders key={item._id} productItem={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Paginator
            currentPage={page}
            totalPages={data?.totalPages || 0}
            onPageChange={setPagination}
          />
        </>
      )}
    </div>
  );
};

export default Store;
