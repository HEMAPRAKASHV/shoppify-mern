import { useRoutes } from "react-router-dom";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { WishlistProvider } from "./context/AddWishlistContext";
import { Suspense } from "react";
import Toaster from "./components/Toaster";
import Loader from "./components/presentational/Loader";
import { routes } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const AppRoutes = () => useRoutes(routes);
  return (
    <ShoppingCartProvider>
      <WishlistProvider>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<Loader />}>
            <AppRoutes />
            <Toaster />
          </Suspense>
        </QueryClientProvider>
      </WishlistProvider>
    </ShoppingCartProvider>
  );
};

export default App;
