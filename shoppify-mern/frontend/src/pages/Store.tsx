import { useEffect, useState } from "react";
import StoreItem from "../components/StoreItems";
import { products } from "../types";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useWishlist } from "../context/AddWishlistContext";
import { useDispatch, useSelector } from "react-redux";
import { ProductActionTypes } from "../store/types/productTypes";
import { RootState } from "../store/reducers/rootReducer";
import { showToast } from "../components/Toaster";
import SearchBar from "../components/reusable/SearchBar";
import Paginator from "../components/reusable/Paginator";

const Store: React.FC = () => {
  const { setcartItems } = useShoppingCart();
  const { setWishlist } = useWishlist();
  const dispatch = useDispatch();
  const allProducts: any = useSelector(
    (state: RootState) => state.product.products
  );
  const [page, setPage] = useState(1);
  const [searchQuery, setQuery] = useState("");
  const totalPages: number | undefined = useSelector(
    (state: RootState) => state.product.totalPages
  );
  const limit = 6;

  useEffect(() => {
    setcartItems();
    setWishlist();
    fetchProducts(searchQuery);
  }, [page, searchQuery]); // Fetch products when page or search query changes

  const fetchProducts = async (searchQuery: string) => {
    try {
      dispatch({
        type: ProductActionTypes.GET_ALL_PRODUCTS_REQUEST,
        payload: { query: searchQuery, page: page, limit: limit },
      });
    } catch (error) {
      showToast(ProductActionTypes.GET_ALL_PRODUCTS_FAILURE, "error");
    }
  };

  const setPagination = async (number: number) => {
    setPage(number);
  };

  const applyFilter = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
  };
  return (
    <div className="p-6">
      <div className="relative mb-4 flex justify-center items-center">
        <SearchBar placeholder="Search products..." onSearch={applyFilter} />
      </div>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Store</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allProducts.length > 0 &&
          allProducts.map((item: products) => (
            <div key={item.id} className="col-span-1">
              <StoreItem {...item} />
            </div>
          ))}
      </div>
      <Paginator
        currentPage={page}
        totalPages={totalPages || 0}
        onPageChange={setPagination}
      />
    </div>
  );
};

export default Store;
