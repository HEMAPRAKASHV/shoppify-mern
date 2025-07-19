import { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

type Props = { element: JSX.Element };

const PublicRoute: React.FC<Props> = ({ element }) => {
  const isLoggedIn: any = useSelector((state: any) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  return isLoggedIn ? <Navigate to="/" replace /> : element;
};

export default PublicRoute;
