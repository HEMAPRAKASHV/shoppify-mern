import { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

type Props = {
  element: JSX.Element;
};

const ProtectedRoute: React.FC<Props> = ({ element }) => {
  const isLoggedIn: boolean = useSelector(
    (state: any) => state.auth.isLoggedIn
  );
  console.log(isLoggedIn);
  return isLoggedIn ? element : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
