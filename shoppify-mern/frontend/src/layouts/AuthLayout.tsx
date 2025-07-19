import { ReactNode } from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";

interface AuthLayoutProps {
    children?: ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="overflow-auto m-0 p-0 fixed top-0 right-0 left-0 w-full bg-no-repeat object-fit bg-cover m-0 p-0">
            <nav className="bg-white shadow-sm p-4">
                <div className="container mx-auto flex items-center">
                    <div className="flex space-x-4 items-center justify-between w-full">
                        <div>
                            <span className="text-gray-800 font-semibold px-3 py-2 rounded-md">Welcome to Shoppify</span>
                        </div>
                        <div className="space-x-2">
                            <Link to={"/auth/login"} className="text-blue-100">Login</Link>
                            <Link to={"/auth/register"} className="text-blue-100">Register</Link>
                        </div>
                    </div>
                </div>
            </nav>
            {children || <Outlet />}
            <Footer />
        </div>
    );
}

export default AuthLayout